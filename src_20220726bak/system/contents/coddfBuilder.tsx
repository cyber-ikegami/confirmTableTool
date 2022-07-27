import ContentsBuilder from "./common/contentsBuilder";
import ContentsUtil from "../utils/contentsUtil";
import DefineUtil from "../utils/defineUtil";

class CoddfBuilder implements ContentsBuilder {
    tabName(): string {
        return DefineUtil.CODDF_TAB_NAME;
    };
    getOutputAreaProps(): ContentsUtil.OutputAreaInfo {
        return {
            target: 'coddfList',
            columnInfoList: [
                { columnName: 'codeKn', width: 80 },
                { columnName: 'codeNam', width: 300 },
                { columnName: 'codeDef', width: 150 }
            ]
        }
    };
    functionList(): ContentsUtil.FunctionInfo[] {
        return [
            { labelName: '管理情報', destTabName: DefineUtil.CDKAN_TAB_NAME, filterCondition: (curRecord: string[], destRecord: string[]) => {
                return curRecord[0] === destRecord[0];
            }}
        ];
    };
};

export default CoddfBuilder;