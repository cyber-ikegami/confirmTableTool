import ContentsBuilder from "./common/contentsBuilder";
import ContentsUtil from "../utils/contentsUtil";
import DefineUtil from "../utils/defineUtil";

class ColdfBuilder implements ContentsBuilder {
    tabName(): string {
        return DefineUtil.COLDF_TAB_NAME;
    };
    getOutputAreaProps(): ContentsUtil.OutputAreaInfo {
        return {
            target: 'coldfList',
            columnInfoList: [
                { columnName: 'tblDef', width: 80 },
                { columnName: 'colDef', width: 80 },
                { columnName: 'colNam', width: 330 }
            ]
        }
    };
    functionList(): ContentsUtil.FunctionInfo[] {
        return [
            { labelName: 'テスト', destTabName: DefineUtil.TBLDF_TAB_NAME, filterCondition: (curRecord: string[], destRecord: string[]) => {
                return true;
            }}
        ];
    };
};

export default ColdfBuilder;