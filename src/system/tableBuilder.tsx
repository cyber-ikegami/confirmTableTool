import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import ContentsBuilder from "./contents/common/contentsBuilder";
import ContentsUtil from "./utils/contentsUtil";
import ResourseManager from "./utils/resourseManager";

const TableBuilder = (props: {
    resourseManager: ResourseManager;
    target: string;
    columnInfoList: ContentsUtil.ColumnInfo[];
    selectContents: ContentsBuilder;
    getFocusNoFromTabName: (tabName: string) => number;
}) => {
    const headerRef = useRef<null | HTMLDivElement>(null);
    const bodyRef = useRef<null | HTMLDivElement>(null);

    // 選択中のレコード
    const [focus, setFocus] = useState<number>(-1);
    const [filterList, setFilterList] = useState<string[]>([]);

    // レコード
    const recordList = props.resourseManager.getRecordList(props.target);

    // 母数
    const parameter = recordList.length;
    // フィルター後の件数
    let filterCount = recordList.length;
    // 表示件数
    let dispCount = 0;

    // 選択タブ変更時の初期化
    useEffect(() => {
        setFocus(-1);
        setFilterList([]);
        if (bodyRef.current != null) {
            bodyRef.current.scrollTop = 0;
            bodyRef.current.scrollLeft = 0;
        }
    }, [props.target]);

    // ヘッダーを作成
    const headerJsxList = props.columnInfoList.map((columnInfo, i) => {
        return <_ColumnCell width={columnInfo.width} key={i}>{columnInfo.columnName}</_ColumnCell>;
    });

    // フィルターを作成
    const filterJsxList = props.columnInfoList.map((columnInfo, i) => {
        const cell = filterList[i] != undefined ? filterList[i] : '';
        return (<_FilterCell width={columnInfo.width} key={i}><input type="text" value={cell} onChange={(e) => {
            filterList[i] = e.target.value;
            setFilterList(filterList.slice());
        }}></input></_FilterCell>);
    });

    // テーブル(body)を作成
    const result: any[][] = useMemo(() => {
        let tableList: any[][] = [];
        if (filterList.length !== 0) {
            recordList.forEach((record) => {
                // booleanのリスト
                const isFilterList: boolean[] = record.map((cell, i) => {
                    let cellValue: any = cell;
                    if (props.columnInfoList[i].convertListName != undefined) {
                        const convertList = props.resourseManager.getRecordList((props.columnInfoList[i].convertListName) as string);
                        const afterConvertList = convert(convertList, cell);
                        cellValue = afterConvertList != undefined ? afterConvertList[1] : '-';
                    }
                    return String(cellValue).includes(filterList[i] || '');
                });

                // ↑ isFilterListにfalseが存在する列を表示しない
                if (!(isFilterList.includes(false))) {
                    const resultCellList = record.map((cell) => {
                        return cell;
                    })
                    tableList.push(resultCellList);
                };
            })
        } else {
            tableList = recordList;
        };
        filterCount = tableList.length;
        return tableList;
    }, [props.target, filterList]);

    const bodyJsxList: JSX.Element[] = [];
    let cellJsxList: JSX.Element[] = [];
    // 最大100件表示する
    for (let i = 0; result.length >= 100 ? i < 100 : i < result.length; i++) {
        cellJsxList = result[i].map((cell, j) => {
            // convertListが存在すれば変換する
            let cellValue: any = cell;
            if (props.columnInfoList[j].convertListName != undefined) {
                const convertList = props.resourseManager.getRecordList((props.columnInfoList[j].convertListName) as string);
                const afterConvertList = convert(convertList, cell);
                cellValue = afterConvertList != undefined ? afterConvertList[1] : '-';
            }
            return (
                <_BodyCell width={props.columnInfoList[j].width} isSelect={focus === i} key={j} onClick={() => {
                    setFocus(i);
                }}>{cellValue}</_BodyCell>
            );
        });
        dispCount = i + 1;
        bodyJsxList.push(<_Record key={i}>{cellJsxList}</_Record>);
    }

    // フッターを作成
    const fotterAreaJsxList = props.selectContents.functionList().map((fanc, i) => {
        return < _Button key={i} onClick={() => {
            props.resourseManager.setFilterCondition((destRecord: string[]) => fanc.filterCondition(recordList[focus], destRecord));
            props.getFocusNoFromTabName(fanc.destTabName);
        }}> {fanc.labelName}</_Button>;
    });

    return (
        <_Frame>
            <_ContentsFrame>
                <_OutputCountArea>{`母数：${parameter}件　フィルター：${filterCount}件　表示：${dispCount}件`}</_OutputCountArea>
                <_HeaderFrame ref={headerRef}>
                    <_Header>{headerJsxList}</_Header>
                    <_Header>{filterJsxList}</_Header>
                </_HeaderFrame>
                <_Body ref={bodyRef} onScroll={() => {
                    if (bodyRef.current != null && headerRef.current != null) {
                        headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
                    }
                }}>{bodyJsxList}</_Body>
            </_ContentsFrame>
            <_Fotter>{fotterAreaJsxList}</_Fotter>
        </_Frame>
    );
};

// 変換
const convert = (convertList: string[][], cell: string) => {
    return convertList.find(value => {
        if (value[0] === cell) {
            return value[1];
        }
    });
};

export default TableBuilder;

// フレーム
const _Frame = styled.div`
  height: 100%;
  width: 100%;
  display: inline-block;
`;

// テーブル出力のエリア
const _ContentsFrame = styled.div`
  height: calc(100% - 40px);
  width: 100%;
  display: inline-block;
`;

const _HeaderFrame = styled.div`
    width: calc(100% - 14px);
    overflow: hidden;
`;

// ヘッダー
const _Header = styled.div`
    height: 25px;
    width: 100%;
    display: block;
    white-space: nowrap;
    
`;

// ボディ
const _Body = styled.div`
    height: calc(100% - 75px);
    width: 100%;
    background-color: #f8faba;
    display: inline-block;
    overflow: auto;
    white-space: nowrap;
`;

// 出力件数エリア
const _OutputCountArea = styled.div`
    height: 25px;
    width: 100%;
    font-size: 15px;
`;

// レコード
const _Record = styled.div`
    display: block;
    height: 25px;
`;

// セル
const _CellBase = styled.div<{
    width: number;
}>`
    display: inline-block;
    font-size: 15px;
    border: 1px solid #1a1a1a;
    vertical-align: top;
    width: ${props => props.width}px;
    height: 25px;
`;

// セル(カラム名)
const _ColumnCell = styled(_CellBase)`
    background-color: #ffbc37;
`;

// セル(フィルター)
const _FilterCell = styled(_CellBase)`
    & input {
        width: 100%;
        box-sizing: border-box; 
    }
`;

// セル(ボディ)
const _BodyCell = styled(_CellBase) <{
    isSelect: boolean;
}>`
    background-color: ${props => props.isSelect ? '#fffc37' : 'white'};
`;

// フッター
const _Fotter = styled.div`
  height: 40px;
  width: 100%;
  background-color: #ffd768;
  display: inline-block;
`;

// 表示ボタン
const _Button = styled.div`
  background-color: #eef5ff;
  display: inline-block;
  font-size: 15px;
  width: 100px;
  height: calc(100% - 10px);
  text-align: center;
  margin-top: 5px;
  margin-left: 5px;
  border: 1px solid #919191;
  border-radius: 5px;
  line-height: 30px;
  &:hover {
      background-color:#b1bff5;
  }
`;