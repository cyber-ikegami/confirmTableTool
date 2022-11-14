class ResourseManager {
    private resourse: any;

    private filterCondition: (record: string[]) => boolean;

    constructor(resourse: any) {
        this.resourse = resourse;
        this.filterCondition = () => { return true };
    }

    public setFilterCondition(filterCondition: (record: string[]) => boolean) {
        this.filterCondition = filterCondition;
    }

    /** 初期化(常に全部表示(true)する) */
    public resetFilter() {
        this.filterCondition = () => { return true };
    }

    /**
     * テーブルの取得
     * @param targetList テーブル名
     * @param targetName defineListを識別する値
     * @returns テーブル
     */
    public getRecordList(targetList: string, targetName?: string) {
        return (this.resourse[targetList] as string[][]).filter((record) => {
            if (targetName != undefined) {
                if (record[0] === targetName) {
                    return this.filterCondition(record);
                }
            } else {
                return this.filterCondition(record);
            };
        });
    }
};

export default ResourseManager;
