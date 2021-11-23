import React from 'react';
import { Input as SensebeeInput } from 'antd';
import styles from './index.module.scss';

import { CloseCircleFilled, PlusCircleFilled, StarFilled } from '@ant-design/icons';
import { Checkbox, Col, Input, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
const InputGroup = Input.Group;

interface IProps {
  inputInfo: IInputList;
  isAllReadOnly: boolean;
  changeInputInfo: any;
  addInputInfo: any;
  deleteInputInfo: any;
  inputIndex: number; // 用于表示当前是第几个配置
}

export interface IInputList {
  isMulti?: Boolean;
  key: string;
  value: string;
  subSelected?: IInfoList[];
}

interface IInfoList {
  isDefault?: any;
  key: string;
  value: string;
}

const TagInput = (props: IProps) => {
  const { inputInfo, isAllReadOnly, changeInputInfo, addInputInfo, deleteInputInfo, inputIndex } =
    props;

  const { t } = useTranslation();

  const stopPropagation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <div key={`inputList_${inputIndex}`}>
      <Row className={styles.select}>
        <Col span={1} className={styles.inputSerial}>
          {inputIndex + 1}
        </Col>
        <Col span={16}>
          <InputGroup compact={true} className={styles.inputGroup}>
            <SensebeeInput
              className={styles.input_single}
              value={inputInfo.key}
              placeholder={t('Type')}
              onChange={(e) => changeInputInfo(e, 'key', inputIndex)}
              onKeyDown={stopPropagation}
              disabled={isAllReadOnly}
            />
            <SensebeeInput
              className={styles.input_single}
              value={inputInfo.value}
              placeholder={t('Value')}
              onChange={(e) => changeInputInfo(e, 'value', inputIndex)}
              onKeyDown={stopPropagation}
              disabled={isAllReadOnly}
            />
          </InputGroup>
        </Col>
        <Col span={7}>
          <div className={styles.headerOption}>
            <Tooltip placement='right' title={t('MultiSelect')}>
              <Checkbox
                className={`${
                  inputInfo.isMulti === true ? styles.checkboxSelected : styles.checkboxUnselected
                } ${styles.icon}`}
                checked={true}
                onChange={(e) => !isAllReadOnly && changeInputInfo(e, 'isMulti', inputIndex)}
              />
            </Tooltip>
            {!isAllReadOnly && (
              <a className={styles.addIcon} onClick={() => addInputInfo(inputIndex)}>
                <PlusCircleFilled />
              </a>
            )}
            {inputIndex > 0 && !isAllReadOnly && (
              <a className={styles.deleteIcon} onClick={() => deleteInputInfo(inputIndex)}>
                <CloseCircleFilled />
              </a>
            )}
          </div>
        </Col>
      </Row>

      {inputInfo.subSelected && (
        <div className={styles.subMain}>
          {inputInfo.subSelected.map((subInfo, j, arr) => (
            <Row className={styles.subSelect} key={j}>
              <Col span={1} className={styles.inputSerial}></Col>
              <Col span={16} className={styles.firstItem}>
                <div className={styles.sub_input_box}>
                  <SensebeeInput
                    className={styles.sub_input}
                    value={subInfo.key}
                    placeholder={t('Type')}
                    onChange={(e) => changeInputInfo(e, 'key', inputIndex, j)}
                    disabled={isAllReadOnly}
                    onKeyDown={stopPropagation}
                  />
                  <SensebeeInput
                    className={styles.sub_input}
                    value={subInfo.value}
                    placeholder={t('Value')}
                    onChange={(e) => changeInputInfo(e, 'value', inputIndex, j)}
                    disabled={isAllReadOnly}
                    onKeyDown={stopPropagation}
                  />
                </div>
              </Col>
              <Col span={7} className={styles.headerOption}>
                <div
                  className={`
                        ${styles.star}
                        ${subInfo.isDefault ? styles.starSelected : styles.starUnselected} 
                      `}
                  onClick={(e) => !isAllReadOnly && changeInputInfo(e, 'isDefault', inputIndex, j)}
                >
                  <Tooltip placement='right' title={t('DefaultOrNot')}>
                    <StarFilled style={{ width: 16, height: 16 }} />
                  </Tooltip>
                </div>
                {arr.length > 1 && !isAllReadOnly && (
                  <a
                    style={{
                      color: '#CCCCCC',
                    }}
                    onClick={() => deleteInputInfo(inputIndex, j)}
                  >
                    <CloseCircleFilled />
                  </a>
                )}
              </Col>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
