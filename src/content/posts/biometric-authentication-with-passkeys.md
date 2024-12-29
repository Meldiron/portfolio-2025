---
title: "Biometric authentication with Passkeys"
pubDate: 2024-03-09 #Y-M-D
description: "Authenticate users with their what they are."
image: { url: "/posts/passkey.png", alt: "Lock" }
highlight: true
---

Password-based authentication is the most common form of authentication, but it is not the most secure. Ideally, everyone is using a password manager to have a unique and strong password on every website, and everyone protects their account with multi-factor authentication. That's not a reality, sadly. While the website can enforce some best practices for password security, password reusing - a leading problem of internet security - not all can be prevented by developers.

## Introduction and benefits

Passkeys provide an authentication method that does not require users to remember a password. Instead, to authenticate, a combination of owning a device with a private key and authorizing yourself with fingerprint, face, or voice is needed. Passkeys use public key cryptography technology, which provides security that is incomparable to password-based authentication. If a server or a database is ever compromised, the user's passkeys remain secure since there is no secret stored on the server. This makes server breaches ineffective to passkey authentication. The nature of implementation also makes phishing attacks impossible since a passkey can only be used on the website on which registration happened. Your users will no longer be tricked into signing in to an attacker's website.

Using passkeys instead of password-based authentication can lead to faster and more secure sign-ins, reduce the cost of multi-factor authentication such as SMS or e-mail, and provide a faster sign-up process. Passkeys can also be used to safely access your account on a friend's device or in a public library, thanks to passkey QR codes. This gives convenience that other sign-in methods, such as MagicURL or OAuth2, do not have.

![Touch ID modal](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m0nlz8q695agejo4980h.png)

## Step by step implementation

Implementing passkey involves multiple steps to keep the entire process secure and reliable. The following technologies will be used in this demo:

- [SimpleWebAuthn](https://simplewebauthn.dev/) for passkey implementation
- [Alpine.js](https://alpinejs.dev/) for reactive frontend
- [Node.js](https://nodejs.org/en) for custom backend endpoints
- [Appwrite](https://appwrite.io/) for user management, databases, and serverless functions

![Demo application showcase](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/izoyetoeu79ycolc57n5.png)

The entire source code can be found on [GitHub](https://github.com/Meldiron/authenticate-with-passkey). I recommend checking it out if you are planning on implementing passkey in your project. Code snippets in the article are simplified to showcase the basics of the implementation, while source code on GitHub covers all edge cases. Such edge cases are, for example, input validation, challenge cleanup, or improved logging.

### Registration with Passkey

The registration form consists of two very simple components, an e-mail and a submit button.

```html
<form x-data="app" @submit.prevent="onSignUp()>
  <input x-model="email" type="email" required="true" />
  <button type="submit">Sign up</button>
</form>
```

Once the form is submitted, a client sends a request to start a registration challenge for a passkey.

```js
const responseStart = await fetch("/v1/challenges", {
  method: "POST",
  body: JSON.stringify({ email: this.email }),
  headers: {
    "Content-type": "application/json",
  },
});

const body = await responseStart.json();
```

With a response from the server, a client can request a browser to register a new passkey. What happens next depends on the browser and operating system, and multiple modals can be shown to the user for them to decide which passkey manager they want to use.

```js
const registration = await SimpleWebAuthnBrowser.startRegistration(
  body.options,
);
```

Earlier, a client sent a request to the `/v1/challenges` endpoint. This endpoint needs to generate a new challenge, store it in a database, and return challenge details back to the client.

```js
const user = await appwrite.prepareUser(req.body.email);

const options = await SimpleWebAuthnServer.generateRegistrationOptions({
  rpName: "Passkeys Demo (Appwrite)",
  rpID: process.env.ALLOWED_HOSTNAME,
  userID: user.$id,
  userName: req.body.email,
  userDisplayName: req.body.email,
  attestationType: "none",
  authenticatorSelection: {
    residentKey: "preferred",
    userVerification: "preferred",
    authenticatorAttachment: "platform",
  },
});

const challenge = await appwrite.createChallenge(user.$id, options.challenge);

return res.json({ challengeId: challenge.$id, options });
```

With that, the client can successfully generate a new passkey. Once the passkey is generated, the client needs to inform the server with a public key so it can be stored on the backend for future authentication.

```js
const responseFinish = await fetch("/v1/challenges", {
  method: "PUT",
  body: JSON.stringify({
    challengeId: body.challengeId,
    registration,
  }),
  headers: {
    "Content-type": "application/json",
  },
});
```

Backend implements a new method on `/v1/challenges` to verify that public key corresponds to the original challenge, and stores credentials in the database.

```js
const { challengeId, registration } = req.body;

const challenge = await appwrite.getChallenge(challengeId);

const verification = await SimpleWebAuthnServer.verifyRegistrationResponse({
  response: registration,
  expectedChallenge: challenge.token,
  expectedOrigin: "https://" + process.env.ALLOWED_HOSTNAME,
  expectedRPID: process.env.ALLOWED_HOSTNAME,
});

const { verified, registrationInfo } = verification;

if (verified) {
  await appwrite.createCredentials(challenge.userId, {
    credentialID: SimpleWebAuthnServerHelpers.isoUint8Array.toHex(
      registrationInfo.credentialID,
    ),
    credentialPublicKey: SimpleWebAuthnServerHelpers.isoUint8Array.toHex(
      registrationInfo.credentialPublicKey,
    ),
    counter: registrationInfo.counter,
    credentialDeviceType: registrationInfo.credentialDeviceType,
    credentialBackedUp: registrationInfo.credentialBackedUp,
    transports: registration.response.transports,
  });
}
```

> This code snippet took a long time to figure out, as Unit8Array cannot be easily stored in a database, so it needs to be encoded to a hex value before being stored. Later, it can be decoded before authentication verification. Attempting to JSON stringify and parse Unit8Array managed to store _some_ data, but didn't with properly.

With all of that in place, the registration flow using passkey is finished.

![Sign in demo video](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ierj3wihlg46w3x3ywhb.gif)

### Login with Passkey

Similar to the sign-up process, it starts with a simple HTML form.

```html
<form x-data="app" @submit.prevent="onSignIn()>
  <input x-model="email" type="email" required="true" />
  <button type="submit">Sign in</button>
</form>
```

Sign-in process also starts with a challenge. It's for the same public key cryptography secure reasons, but this time, the backend also takes advantage of having the public key in the database. When creating a challenge for the client, the server will also provide basic details about the allowed public key so the client device can suggest only relevant passkey.

First, a client sends a request to a new `/v1/tokens` endpoint, and starts the authentication process with challenge details from the server response:

```js
const responseStart = await fetch("/v1/tokens", {
  method: "POST",
  body: JSON.stringify({ email: this.email }),
  headers: {
    "Content-type": "application/json",
  },
});

const body = await responseStart.json();

const authentication = await SimpleWebAuthnBrowser.startAuthentication(
  body.options,
);
```

Next, a challenge is created on the server. This time, it's not a registration challenge, but instead, an authentication challenge.

```js
const user = await appwrite.prepareUser(req.body.email);
const credential = await appwrite.getCredential(user.$id);
const authenticator = JSON.parse(credential.credentials);

const options = await SimpleWebAuthnServer.generateAuthenticationOptions({
  rpID: process.env.ALLOWED_HOSTNAME,
  userVerification: "preferred",
  allowCredentials: [
    {
      id: SimpleWebAuthnServerHelpers.isoUint8Array.fromHex(
        authenticator.credentialID,
      ),
      type: "public-key",
      transports: authenticator.transports,
    },
  ],
});

const challenge = await appwrite.createChallenge(user.$id, options.challenge);

return res.json({
  challengeId: challenge.$id,
  options,
});
```

With that implemented, the client is now prompted to select and authorize a passkey during the sign-in process. To finalize the authentication flow, the client sends one more request to the server with details about the selected passkey for final verification. Notice the server now responds with session details, which the client uses to authenticate into the Appwrite account.

```js
const responseFinish = await fetch("/v1/tokens", {
  method: "PUT",
  body: JSON.stringify({ challengeId: body.challengeId, authentication }),
  headers: {
    "Content-type": "application/json",
  },
});

const token = await responseFinish.json();

await account.createSession(token.userId, token.secret);
```

Last but not least, we implement final authentication verification on the server and implement logic to generate an Appwrite session for the client.

```js
const { challengeId, authentication } = req.body;
const challenge = await appwrite.getChallenge(challengeId);
const credential = await appwrite.getCredential(challenge.userId);

const authenticator = JSON.parse(credential.credentials);
authenticator.credentialID = SimpleWebAuthnServerHelpers.isoUint8Array.fromHex(
  authenticator.credentialID,
);
authenticator.credentialPublicKey =
  SimpleWebAuthnServerHelpers.isoUint8Array.fromHex(
    authenticator.credentialPublicKey,
  );
let verification = await SimpleWebAuthnServer.verifyAuthenticationResponse({
  response: authentication,
  expectedChallenge: challenge.token,
  expectedOrigin: "https://" + process.env.ALLOWED_HOSTNAME,
  expectedRPID: process.env.ALLOWED_HOSTNAME,
  authenticator,
});

const { verified } = verification;
if (!verified) {
  return res.send("Incorrect passkey.", 400, corsHeaders);
}

const token = await appwrite.createSessionToken(challenge.userId);

return res.json({
  secret: token.secret,
  userId: challenge.userId,
});
```

Authentication flow is now finished and users can sign into the application using passkey.

![Sign-in demo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2vn7vb026lh2x6lwswbk.gif)

As mentioned earlier, code snippets in the article are simplified. Please refer to the source code on [GitHub](https://github.com/Meldiron/authenticate-with-passkey) for a detailed implementation of the passkey authentication flow.

## Additional resources

When first learning about passkey, [passkeys.com](https://www.passkeys.com/guides) can be a great starting point to understand the basics.

For implementing passkey on a website and in a Node.js server, [SimpleWebAuthn docs](https://simplewebauthn.dev/docs/) has great descriptive examples.

If you prefer to have basics provided and plan to customize the flow yourself, I would recommend using the [Appwrite Function template](https://github.com/Meldiron/authenticate-with-passkey).

If you are looking for a Cloud solution that is easy to get up and running, you can use providers such as [Hanko](https://www.hanko.io/) or [Passkeys.io](https://www.passkeys.io/) or [Auth0](https://auth0.com/docs/authenticate/database-connections/passkeys).
