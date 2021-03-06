import { i18n } from '@labelbee/lb-components';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      NewProject: 'New Project',
      ProjectList: 'Project List',
      NewOneStepProject: 'Single Step',
      NewMultiStepProject: 'Multiple Step',
      QAStep: 'Quality Inspection - Step {{step}}',
      Confirm: 'Confirm',
      NoData: 'No Data',
      TaskSteps: 'Task Steps',
      AddTaskStepsNotify: 'Please add task steps',
      New: 'New',
      SelectDataSourceNotify: 'Please select the data source',
      SelectToolNotify: 'Please select an annotation tool',
      DataSource: 'Data Source',
      OriginalImage: 'Original Image',
      AnnotationTool: 'Annotation Tool',
      Save: 'Save',
      ProjectName: 'Project Name',
      Required: 'Required',
      SelectImageFolder: 'Image Path',
      InputProjectName: 'Please Input Project Name',
      SelectResultFolder: 'Result Path',
      SelectResultFolderNotify: 'Result files will overwrite path files',
      UpperLimitPoints: 'Upper Limit Points',
      TextAnnotation: 'Text',
      AttributeAnnotation: 'Attribute',
      Straight: 'Straight',
      Curve: 'Curve',
      LineType: 'Line Type',
      ClosedPoints: 'Closed Points',
      PointsLimit: 'Points Limit',
      EdgeAdsorption: 'Edge Adsorption',
      PointsZeroLimitNotify: 'The number of points need greater than 0',
      PointLowLimitNotify: 'The minimum number of points must not be less than {{num}}',
      LowLimitMustGreaterThanUpNotify:
        'The upper limit of points must be greater than or equal to the lower limit',
      LowerLimitPoints: 'Lower Limit Points',
      SmallestSize: 'Smallest Size',
      ConfigurationFormatErrorNotify: 'Configuration format error',
      Form: 'Form',
      Type: 'Type',
      InputReg:
        'Please enter a regular expression (Recommended to contact developer for assistance)',
      TextList: 'Text List',
      Name: 'Name',
      MaximumTextInput: 'Maximum Text Input',
      DefaultTextCharactersLimitNotify:
        'Please enter a  default text no more than ${len} characters',
      Add: 'Add',
      TextSettings: 'Text Settings',
      DisplayValue: 'Display Value',
      SaveValue: 'Save Value',
      MoreSettings: 'More Settings',
      ImagePath: 'Image Path',
      ResultPath: 'Result Path',
      ConfirmToDelete: 'Confirm To Delete',
      OutOfTargetAnnotation: 'Out-Of-Target',
      CopyThePreview: 'Copy The Preview',
      ShowOrder: 'Show Order',
      Detection: 'Detection',
      Classification: 'Classification',
      SemanticSegmentation: 'Segmentation',
      Line: 'Line',
      Text: 'Text',
      Point: 'Point',
      MultiStepAnnotation: 'Multi-Step Annotation',
      NStep: '{{step}}-th Step',
      NStep_one: '{{step}}-st Step',
      NStep_two: '{{step}}-nd Step',
      NStep_three: '{{step}}-rd Step',
      AnyString: 'Any',
      OrderString: 'Order',
      EnglishOnly: 'English Only',
      NumbersOnly: 'Numbers Only',
      CustomFormat: 'Custom Format',
      SelectExportFormat: 'Select export Format',
      ExportFormat: 'Export format',
      StandardFormat: 'LabelBee format',
      ExportSuccess: 'Export successfully',
      ExportCOCOLimitMsg: 'Only rectTool and polygonTool can realize the conversion of coco data',
      ExportYOLOLimitMsg: 'Only rectTool can realize the conversion of yolo data',
      ExportMaskLimitMsg: 'Only polygonTool can realize the conversion of Mask',
      SelectedExportPath: 'Choose Export path',
      MultiSelect: 'multi-select',
      DefaultOption: 'Default Option',
      MessageBeforeExport: 'Exporting, please wait',
      ImportFromClipboard: 'Import from clipboard',
      PleaseCopyTheCorrectStepList: 'Please copy the correct step list',
      CopyConfigSuccessfully: 'Copy project config Successfully',

      // Project Operation
      CopyProjectConfig: 'Copy project config',
      ExportAnnotationResults: 'Export annotation results',
      ModifyConfig: 'Modify config',

      // data Check
      NoImgInPath: 'No images in the current Path',
      NoSameConfig:
        'The toolType of project configuration does not match result in your resultPath, please check before annotating',
    },
  },
  cn: {
    translation: {
      NewProject: '????????????',
      ProjectList: '????????????',
      TaskSteps: '????????????',
      NewOneStepProject: '?????????',
      NewMultiStepProject: '?????????',
      QAStep: '??????-??????{{step}}',
      ConfirmToDeleteSteps: '???????????????????????????',
      Confirm: '??????',
      Cancel: '??????',
      NoData: '????????????',
      AddTaskStepsNotify: '?????????????????????',
      New: '??????',
      SelectDataSourceNotify: '??????????????????',
      SelectToolNotify: '?????????????????????',
      DataSource: '?????????',
      OriginalImage: '??????',
      AnnotationTool: '????????????',
      Save: '??????',
      ProjectName: '????????????',
      Required: '?????????',
      InputProjectName: '?????????????????????',
      SelectImageFolder: '?????????????????????',
      SelectResultFolder: '?????????????????????',
      SelectResultFolderNotify:
        '???????????????????????????????????????????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????',
      UpperLimitPoints: '????????????',
      TextAnnotation: '????????????',
      AttributeAnnotation: '????????????',
      StraightLine: '??????',
      CurveLine: '??????',
      LineType: '????????????',
      ClosedPoints: '????????????',
      PointsLimit: '????????????',
      EdgeAdsorption: '????????????',
      PointsZeroLimitNotify: '??????????????????????????????0?????????',
      PointLowLimitNotify: '?????????????????????????????????{{num}}',
      LowLimitMustGreaterThanUpNotify: '???????????????????????????????????????',
      LowerLimitPoints: '???????????????????????????????????????',
      SmallestSize: '????????????',
      ConfigurationFormatErrorNotify: '??????????????????',
      Type: '??????',
      Form: '??????',
      Value: '???',
      InputReg: '????????????????????????(??????????????????????????????)',
      TextList: '????????????',
      Name: '??????',
      MaximumTextInput: '??????????????????',
      DefaultText: '???????????????',
      DefaultTextCharactersLimitNotify: '?????????????????? {{len}} ????????????????????????',
      Add: '??????',
      TextSettings: '????????????',
      DisplayValue: '?????????',
      SaveValue: '?????????',
      MoreSettings: '????????????',
      ImagePath: '????????????',
      ResultPath: '????????????',
      ConfirmToDelete: '?????????????',
      OutOfTargetAnnotation: '???????????????',
      CopyThePreview: '?????????????????????',
      ShowOrder: '??????????????????',
      Detection: '???????????????????????????',
      Classification: '????????????????????????',
      SemanticSegmentation: '???????????????????????????',
      Line: '??????',
      Text: '??????',
      Point: '??????',
      MultiStepAnnotation: '???????????????',
      NStep: '???{{step}}???',
      AnyString: '????????????',
      OrderString: '??????',
      EnglishOnly: '?????????',
      NumbersOnly: '?????????',
      CustomFormat: '???????????????',
      SelectExportFormat: '??????????????????',
      ExportFormat: '????????????',
      StandardFormat: 'labelbee ??????',
      ExportSuccess: '????????????',
      ExportCOCOLimitMsg: '?????????????????????????????????????????? coco ???????????????',
      ExportYOLOLimitMsg: '?????????????????????????????? yolo ???????????????',
      ExportMaskLimitMsg: '????????????????????????????????? Mask ???????????????',
      SelectedExportPath: '?????????????????????',
      MultiSelect: '??????',
      DefaultOption: '????????????',
      MessageBeforeExport: '?????????????????????',
      ImportFromClipboard: '???????????????',
      PleaseCopyTheCorrectStepList: '??????????????????????????????',
      CopyConfigSuccessfully: '????????????????????????',

      // Project Operation
      CopyProjectConfig: '??????????????????',
      ExportAnnotationResults: '??????????????????',
      ModifyConfig: '????????????',

      // data Check
      NoImgInPath: '????????????????????????',
      NoSameConfig: '?????????????????????????????????????????????????????????????????????',
    },
  },
};

i18n.addResourceBundle('en', 'translation', resources.en.translation, true);
i18n.addResourceBundle('cn', 'translation', resources.cn.translation, true);

export default i18n;
