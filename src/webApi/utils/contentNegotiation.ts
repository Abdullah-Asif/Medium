import {Request, Response} from "express";
import {jsonToPlainText, Options} from "json-to-plain-text"
import jsonToxml from "jsontoxml"
class ContentNegotiation{
    public sendJsonResponse(req: Request, res: Response, status: number, data: any) {
        return res.status(status).json(data);
    }

    public sendXMLResponse(req: Request, res: Response, status: number, data: any) {
        res.setHeader("Content-type", "application/xml");
        const xmlData = jsonToxml(data);
        console.log(xmlData);
        return res.status(status).send(xmlData);
    }

    public sendTextResponse(req: Request, res: Response, status: number, data: any) {
        res.setHeader("Content-type","text/plain");
        const plainText = jsonToPlainText(data, {});
        // const jsonData = JSON.stringify(data, null, 2);
        return res.status(status).send(plainText);

    }
    public sendResponse(req: Request, res: Response, status: number, data: any) {
        if (req.headers.accept == "application/xml") {
            return this.sendXMLResponse(req, res, status, data);
        }
        else if (req.headers.accept == "text/plain") {
            return this.sendTextResponse(req, res, status, data);
        }
        else {
            return this.sendJsonResponse(req, res, status, data);
        }
    }
}
export default new ContentNegotiation();