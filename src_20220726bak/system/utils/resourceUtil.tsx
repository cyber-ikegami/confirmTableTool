import ContentsUtil from "./contentsUtil";

namespace ResourceUtil {
    export type Root = {
        tbldfList: Tbldf[];
        coddfList: Coddf[];
    };

    export type Tbldf = {
        tblDef: string;
        tblNam: string;
    };

    export type Coddf = {
        codeKn: string;
        codeNam: string;
        codeDef: string;
    };

    export type Coldf = {
        tblDef: string;
        colDef: string;
        colNam: string;
    };
};

export default ResourceUtil;