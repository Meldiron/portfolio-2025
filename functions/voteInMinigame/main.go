package handler

import (
	"os"

	"github.com/open-runtimes/types-for-go/v4/openruntimes"

	"github.com/appwrite/sdk-for-go/appwrite"
	"github.com/appwrite/sdk-for-go/id"
	"github.com/appwrite/sdk-for-go/models"
	"github.com/appwrite/sdk-for-go/query"
)

type CustomBody struct {
	Tool  string `json:"tool"`
	Value int    `json:"value"`
}

type AppwriteScoreList struct {
	*models.DocumentList
	Documents []AppwriteScore `json:"documents"`
}

type AppwriteScore struct {
	*models.Document
	Name  string `json:"name"`
	Score int    `json:"score"`
}

func Main(Context openruntimes.Context) openruntimes.Response {
	var body CustomBody
	err := Context.Req.BodyJson(&body)
	if err != nil {
		return Context.Res.Text("Invalid body.", Context.Res.WithStatusCode(400))
	}

	if body.Value != 1 && body.Value != -1 {
		return Context.Res.Text("Invalid value.", Context.Res.WithStatusCode(400))
	}

	client := appwrite.NewClient(
		appwrite.WithEndpoint(os.Getenv("APPWRITE_FUNCTION_API_ENDPOINT")),
		appwrite.WithProject(os.Getenv("APPWRITE_FUNCTION_PROJECT_ID")),
		appwrite.WithKey(Context.Req.Headers["x-appwrite-key"]),
	)
	databases := appwrite.NewDatabases(client)

	responseScores, err := databases.ListDocuments("main", "scores", databases.WithListDocumentsQueries([]string{
		query.Limit(1),
		query.Equal("name", body.Tool),
	}))
	if err != nil {
		Context.Error(err)
		return Context.Res.Text("Internal error.", Context.Res.WithStatusCode(500))
	}

	var listScores AppwriteScoreList
	err = responseScores.Decode(&listScores)
	if err != nil {
		Context.Error(err)
		return Context.Res.Text("Internal error.", Context.Res.WithStatusCode(500))
	}

	if listScores.Total == 0 {
		_, err = databases.CreateDocument("main", "scores", id.Unique(), map[string]interface{}{
			"name":  body.Tool,
			"score": body.Value,
		})
		if err != nil {
			Context.Error(err)
			return Context.Res.Text("Internal error.", Context.Res.WithStatusCode(500))
		}
	} else {
		scoreId := listScores.Documents[0].Id
		scoreValue := listScores.Documents[0].Score

		_, err = databases.UpdateDocument("main", "scores", scoreId, databases.WithUpdateDocumentData(map[string]interface{}{
			"score": scoreValue + body.Value,
		}))
		if err != nil {
			Context.Error(err)
			return Context.Res.Text("Internal error.", Context.Res.WithStatusCode(500))
		}
	}

	return Context.Res.Empty()
}
