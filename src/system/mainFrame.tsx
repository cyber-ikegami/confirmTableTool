import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import TbldfBuilder from './contents/tbldfBuilder';
import CoddfBuilder from './contents/coddfBuilder';
import ContentsBuilder from './contents/common/contentsBuilder';
import TableBuilder from './tableBuilder';
import ResourseManager from './utils/resourseManager';
import ColdfBuilder from './contents/coldfBuilder';
import KinouBuilder from './contents/kinouBuilder';
import KubunBuilder from './contents/kubunBuilder';
import CdkanBuilder from './contents/cdkanBuilder';
import zlib from "zlib";
import KnprpBuilder from './contents/knprpBuilder';
import UnprpBuilder from './contents/unprpBuilder';

/** キャッシュ **/
export type CashInfo = {
  // 検索欄の情報
  filterList: string[];
  // 選択されている箇所
  focus: number;
  // スクロール量(縦)
  scrollTop: number;
  // スクロール量(縦)
  scrollLeft: number;
};

// 読み込んだファイル名
let fileName: String = '';

const MainFrame = () => {
  // 選択中のタブ
  const [focus, setFocus] = useState<number>(-1);
  // 取得したファイルの中身
  const [resourseManager, setResourseManager] = useState<null | ResourseManager>(null);

  // 関連カラムから遷移した場合に保持するキャッシュ（フィルターリスト、フォーカス、スクロール量）
  const [cash, setCash] = useState<CashInfo | null>(null);

  const contentsList: ContentsBuilder[] = [
    new TbldfBuilder(),
    new ColdfBuilder(),
    new KinouBuilder(),
    new KubunBuilder(),
    new CoddfBuilder(),
    new CdkanBuilder(),
    new UnprpBuilder(),
    new KnprpBuilder()
  ];

  // 遷移先タブ名からfocus番号に変換
  const getFocusNoFromTabName = (tabName: string): number => {
    let focusNo = -1;
    contentsList.forEach((v, i) => {
      if (v.tabName() === tabName) focusNo = i;
    })
    setFocus(focusNo);
    return focusNo;
  };

  // ヘッダー
  const headerJsxList = contentsList.map((value, i) => {
    return (
      <_Tab isActive={focus === i} key={i} onClick={() => {
        (resourseManager as ResourseManager).resetFilter();
        setFocus(i);
        setCash(null);
      }}>{value.tabName()}</_Tab>
    );
  });

  // 出力エリア
  const outputAreaJsx = useMemo(() => {
    if (focus === -1) {
      return <></>;
    }
    const target = contentsList[focus].getOutputAreaProps().target;
    const columnInfoList = contentsList[focus].getOutputAreaProps().columnInfoList;
    return (
      <TableBuilder
        fileName={fileName}
        resourseManager={resourseManager as ResourseManager}
        target={target}
        columnInfoList={columnInfoList}
        selectContents={contentsList[focus]}
        getFocusNoFromTabName={getFocusNoFromTabName}
        cash={cash}
        setCash={setCash}
      ></TableBuilder>
    );
  }, [focus]);

  return (
    <_Frame>
      <_SelectFileForm isDisplay={resourseManager == null}>
        <_SelectFileButton onClick={() => {
          getFileText().then((value) => {
            setResourseManager(new ResourseManager(value));
          });
        }}>ファイルを選択</_SelectFileButton>
      </_SelectFileForm>

      <_TabFrame>{headerJsxList}</_TabFrame>
      <_ContentsFrame>{outputAreaJsx}</_ContentsFrame>
      <_FooterFrame>{'　Copyright ikegami v.1.1(2022/12/27)　'}</_FooterFrame>
    </_Frame>
  );
};

export default MainFrame;

// 選択したファイルの中身(JSON)を取得
const getFileText = async () => {
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  fileName = file.name;
  const fileContents = await file.text();
  return JSON.parse(unZip(fileContents));
};

// 圧縮された文字列を複号する
export const unZip = (val: string) => {
  // base64 => Bufferに変換
  const buffer = Buffer.from(val, 'base64')
  // 復号化
  const result = zlib.unzipSync(buffer)
  // デコード
  const str = decodeURIComponent(result.toString())
  return str;
}

// ファイル選択前エリア
const _SelectFileForm = styled.div<{
  isDisplay: boolean;
}>`
  display: ${props => props.isDisplay ? 'block' : 'none'};
  background-color: #0000007f;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
`;

// ファイルを選択ボタン
const _SelectFileButton = styled.div`
  display: inline-block;
  background-color:#eef5ff;
  height: 40px;
  width: 250px;
  font-size: 30px;
  text-align: center;
  border: 1px solid #919191;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`;

// フレーム
const _Frame = styled.div`
  height: 100%;
  width: 100%;
  display: inline-block;
`;

// タブエリア
const _TabFrame = styled.div`
  height: calc(100% - 15px);
  width: 110px; 
  display: inline-block;
  background-color: #f8faba;
`;

// タブ
const _Tab = styled.div<{
  isActive: boolean;
}>`
  cursor: pointer;
  background-color: ${props => props.isActive ? '#ffad42' : '#ffc06d'};
  display: inline-block;
  font-size: 13px;
  text-align: center;
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin-left: 5px;
  margin-top: 5px;
  font-weight: bold;
`;

// コンテンツエリア
const _ContentsFrame = styled.div`
  height: calc(100% - 15px);
  width: calc(100% - 110px);
  background-color: #ffe18d;
  vertical-align: top;
  display: inline-block;
  padding-left: 5px;
  padding-top: 5px;
  box-sizing: border-box;
`;

// フッターエリア
const _FooterFrame = styled.div`
  height: 15px;
  width: 100%;
  background-color: #fff78c;
  font-size: 10px;
  display: inline-block;
  text-align: right;
`