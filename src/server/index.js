require('dotenv').config();

const express = require('express');
const auth = require('./auth');
const client = require('./client');

const app = express();

const annotatorAssetUrl = process.env.ANNOTATOR_ASSET_URL;

app.set('view engine', 'ejs');
app.use(express.static('public'));

/**
 * Renders a list of transcripts to be annotated. When a
 * transcript sid is passed via a `view` query param it 
 * will rerender the page with the annotator embedded
 * via iframe with the transcript passed.
 */
app.get('/annotator/embedded', async (req, res) => {
    const { userId } = await auth.authenticate(req);
    const transcripts = await client.getTranscripts();

    let templateVars = { transcripts };

    if (req.query.view) {
        const transcriptSid = req.query.view;
        const token = await client.getToken(transcriptSid, userId);
        const iframeUrl = `${annotatorAssetUrl}?token=${token}`;

        templateVars.iframeUrl = iframeUrl;
        templateVars.activeTranscript = transcriptSid;
    }

    // See `/views/annotator-embedded.ejs` for template
    res.render('annotator-embedded', templateVars);
});

/**
 * Renders a list of transcripts to be annotated. When a
 * transcript sid is passed via a `view` query param it 
 * will redirect to the standalone version of the annotator
 * with the transcript passed.
 */
app.get('/annotator/standalone', async (req, res) => {
    const { userId } = await auth.authenticate(req);
    const transcripts = await client.getTranscripts();

    let templateVars = { transcripts };

    if (req.query.view) {
        const transcriptSid = req.query.view;
        const token = await client.getToken(transcriptSid, userId);
        const url = `${annotatorAssetUrl}?token=${token}`;
        return res.redirect(url);
    }

    // See `/views/annotator-standalone.ejs` for template
    res.render('annotator-standalone', templateVars);
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
