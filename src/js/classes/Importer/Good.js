import { Artifact } from "../Artifact";
import { Serializer } from "../Serializer";

export const CODES = {
    OK: 0,
    ERROR_INVALID_FILE: 1,
    ERROR_INVALID_FORMAT: 2,
};

export class ImporterGood {
    process(text) {
        let json;
        let errorsCnt = 0;
        let successCnt = 0;
        let items = [];
        let hashes = {};

        try {
            json = JSON.parse(text);
        } catch(e) {
            return {code: CODES.ERROR_INVALID_FILE};
        }

        if (Object.keys(json).length == 0 || json.format !== 'GOOD') {
            return {code: CODES.ERROR_INVALID_FORMAT};
        }

        if (!Array.isArray(json.artifacts)) {
            return {code: CODES.ERROR_INVALID_FORMAT};
        }

        for (const item of json.artifacts) {
            let art = Artifact.fromGood(item);
            if (art) {
                let hash = Serializer.pack(art);
                if (hash && !hashes[hash]) {
                    hashes[hash] = 1;
                    ++successCnt;
                    items.push(art);
                }
            } else {
                ++errorsCnt;
            }
        }

        return {
            code: CODES.OK,
            items: items,
            counts: {
                success: successCnt,
                errors: errorsCnt,
            },
        };
    }

    static export(items) {
        let result = {
            format: "GOOD",
            version: 1,
            artifacts: [],
        };

        for (const item of items) {
            let data = item.toGood();
            if (data) {
                result.artifacts.push(data);
            }
        }

        return result;
    }
}
