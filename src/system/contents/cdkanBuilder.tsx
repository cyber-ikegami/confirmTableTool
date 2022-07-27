import ContentsUtil from "../utils/contentsUtil";
import DefineUtil from "../utils/defineUtil";
import ContentsBuilder from "./common/contentsBuilder";

// class CdkanBuilder implements ContentsBuilder {
//     tabName(): string {
//         return DefineUtil.CDKAN_TAB_NAME;
//     };
//     getOutputAreaProps(): ContentsUtil.OutputAreaInfo {
//         return {
//             target: 'cdkanList',
//             columnInfoList: [
//                 { columnName: 'codeKn', num: 0, width: 80 },
//                 { columnName: 'kanriNo', num: 0, width: 60 },
//                 { columnName: 'kanriNam', num: 0, width: 350 }
//             ]
//         }
//     };
//     functionList(): ContentsUtil.FunctionInfo[] {
//         return [
//             { labelName: 'テスト', destTabName: DefineUtil.TBLDF_TAB_NAME, filterCondition: (curRecord: string[], destRecord: string[]) => {
//                 return true;
//             }}
//         ];
//     };
// };

// export default CdkanBuilder;