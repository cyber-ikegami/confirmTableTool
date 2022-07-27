namespace ContentsUtil {
    /** 出力エリア */
    export type OutputAreaInfo = {
        // テーブル名
        target: string;
        // カラム情報
        columnInfoList: ColumnInfo[];
    };
    
    /** カラム */
    export type ColumnInfo = {
        // カラム名
        columnName: string;
        // 幅
        width: number;
        // 変換リスト
        convertList?: ConvertInfo[];
    };

    /** 変換リスト */
    export type ConvertInfo = {
        // キー
        key: string;
        // 値
        value: string;
    };

    /** フッターのボタン */
    export type FunctionInfo = {
        // ボタン名
        labelName: string;
        // 遷移先のタブ名
        destTabName: string;
        // フィルターの条件
        filterCondition: (curRecord: string[], destRecord: string[]) => boolean;
    };
};

export default ContentsUtil;