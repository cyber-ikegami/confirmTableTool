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
                { columnName: 'サブシステム', num: 0, width: 130, convertListName: 'codsb' },
                { columnName: 'コード分類', num: 1, width: 80 },
                { columnName: 'コード名称（正式）', num: 2, width: 180 },
                { columnName: 'コード名称（略称）', num: 3, width: 180 },
                { columnName: 'コード名称（通称）', num: 4, width: 180 }
            ]
        }
    };
    functionList(): ContentsUtil.FunctionInfo[] {
        return [
            {
                labelName: '管理情報', destTabName: DefineUtil.CDKAN_TAB_NAME, filterCondition: (curRecord: string[], destRecord: string[]) => {
                    return curRecord[1] === destRecord[0];
                }
            }
        ];
    };
};

export default CoddfBuilder;