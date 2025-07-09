export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  LocalDateTime: { input: any; output: any; }
  LocalTime: { input: any; output: any; }
};

/** Access control entry. */
export type AccessControlEntry = {
  __typename?: 'AccessControlEntry';
  allow?: Maybe<Array<Maybe<Permission>>>;
  deny?: Maybe<Array<Maybe<Permission>>>;
  principal?: Maybe<PrincipalKey>;
};

/** Aggregation input type */
export type AggregationInput = {
  count?: InputMaybe<ValueCountAggregationInput>;
  dateHistogram?: InputMaybe<DateHistogramAggregationInput>;
  dateRange?: InputMaybe<DateRangeAggregationInput>;
  geoDistance?: InputMaybe<GeoDistanceAggregationInput>;
  max?: InputMaybe<MaxAggregationInput>;
  min?: InputMaybe<MinAggregationInput>;
  name: Scalars['String']['input'];
  range?: InputMaybe<RangeAggregationInput>;
  stats?: InputMaybe<StatsAggregationInput>;
  subAggregations?: InputMaybe<Array<InputMaybe<AggregationInput>>>;
  terms?: InputMaybe<TermsAggregationInput>;
};

/** Attachment. */
export type Attachment = {
  __typename?: 'Attachment';
  attachmentUrl?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
};


/** Attachment. */
export type AttachmentAttachmentUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** BooleanDSLExpressionInput type */
export type BooleanDslExpressionInput = {
  boost?: InputMaybe<Scalars['Float']['input']>;
  filter?: InputMaybe<Array<InputMaybe<QueryDslInput>>>;
  must?: InputMaybe<Array<InputMaybe<QueryDslInput>>>;
  mustNot?: InputMaybe<Array<InputMaybe<QueryDslInput>>>;
  should?: InputMaybe<Array<InputMaybe<QueryDslInput>>>;
};

/** BooleanFilter input type */
export type BooleanFilterInput = {
  must?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  mustNot?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  should?: InputMaybe<Array<InputMaybe<FilterInput>>>;
};

/** Component. */
export type Component = {
  __typename?: 'Component';
  fragment?: Maybe<FragmentComponentData>;
  image?: Maybe<ImageComponentData>;
  layout?: Maybe<LayoutComponentData>;
  page?: Maybe<PageComponentData>;
  part?: Maybe<PartComponentData>;
  path: Scalars['String']['output'];
  text?: Maybe<TextComponentData>;
  type: ComponentType;
};

/** Component type. */
export enum ComponentType {
  Fragment = 'fragment',
  Image = 'image',
  Layout = 'layout',
  Page = 'page',
  Part = 'part',
  Text = 'text'
}

/** Content. */
export type Content = {
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Content. */
export type Content_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Content. */
export type ContentChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Content. */
export type ContentChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Content. */
export type ContentComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Content. */
export type ContentPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Content. */
export type ContentPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** ContentConnection. */
export type ContentConnection = {
  __typename?: 'ContentConnection';
  edges?: Maybe<Array<Maybe<ContentEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int']['output'];
};

/** ContentEdge. */
export type ContentEdge = {
  __typename?: 'ContentEdge';
  cursor: Scalars['String']['output'];
  node: Content;
};

/** Content path type. */
export enum ContentPathType {
  SiteRelative = 'siteRelative'
}

/** Content type. */
export type ContentType = {
  __typename?: 'ContentType';
  abstract?: Maybe<Scalars['Boolean']['output']>;
  allowChildContent?: Maybe<Scalars['Boolean']['output']>;
  contentDisplayNameScript?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  final?: Maybe<Scalars['Boolean']['output']>;
  form?: Maybe<Array<Maybe<FormItem>>>;
  formAsJson?: Maybe<Scalars['JSON']['output']>;
  icon?: Maybe<Icon>;
  name?: Maybe<Scalars['String']['output']>;
  superType?: Maybe<Scalars['String']['output']>;
};

/** DSLExpressionValueInput type */
export type DslExpressionValueInput = {
  boolean?: InputMaybe<Scalars['Boolean']['input']>;
  double?: InputMaybe<Scalars['Float']['input']>;
  instant?: InputMaybe<Scalars['DateTime']['input']>;
  localDate?: InputMaybe<Scalars['Date']['input']>;
  localDateTime?: InputMaybe<Scalars['LocalDateTime']['input']>;
  localTime?: InputMaybe<Scalars['LocalTime']['input']>;
  long?: InputMaybe<Scalars['Int']['input']>;
  string?: InputMaybe<Scalars['String']['input']>;
};

/** DateHistogram aggregation input type */
export type DateHistogramAggregationInput = {
  field: Scalars['String']['input'];
  format?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  minDocCount?: InputMaybe<Scalars['Int']['input']>;
};

/** DateRange aggregation input type */
export type DateRangeAggregationInput = {
  field: Scalars['String']['input'];
  format?: InputMaybe<Scalars['String']['input']>;
  ranges?: InputMaybe<Array<InputMaybe<DateRangeInput>>>;
};

/** Date range input type */
export type DateRangeInput = {
  from?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

/** Default value. */
export type DefaultValue = {
  __typename?: 'DefaultValue';
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** DSL Geo Point Distance type. */
export enum DslGeoPointDistanceType {
  Nm = 'NM',
  Centimeters = 'centimeters',
  Cm = 'cm',
  Feet = 'feet',
  Ft = 'ft',
  In = 'in',
  Inch = 'inch',
  Kilometers = 'kilometers',
  Km = 'km',
  M = 'm',
  Meters = 'meters',
  Mi = 'mi',
  Miles = 'miles',
  Millimeters = 'millimeters',
  Mm = 'mm',
  Nauticalmiles = 'nauticalmiles',
  Nmi = 'nmi',
  Yards = 'yards',
  Yd = 'yd'
}

/** DSL Operator type. */
export enum DslOperatorType {
  And = 'AND',
  Or = 'OR'
}

/** DSL sort direction type. */
export enum DslSortDirectionType {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** ExistsDSLExpressionInput type */
export type ExistsDslExpressionInput = {
  boost?: InputMaybe<Scalars['Float']['input']>;
  field: Scalars['String']['input'];
};

/** ExistsFilter input type */
export type ExistsFilterInput = {
  field: Scalars['String']['input'];
};

/** Extra data. */
export type ExtraData = {
  __typename?: 'ExtraData';
  base?: Maybe<XData_Base_ApplicationConfig>;
  com_enonic_app_metafields?: Maybe<XData_Com_Enonic_App_Metafields_ApplicationConfig>;
  media?: Maybe<XData_Media_ApplicationConfig>;
};

/** Filter input type */
export type FilterInput = {
  boolean?: InputMaybe<BooleanFilterInput>;
  exists?: InputMaybe<ExistsFilterInput>;
  hasValue?: InputMaybe<HasValueFilterInput>;
  ids?: InputMaybe<IdsFilterInput>;
  notExists?: InputMaybe<NotExistsFilterInput>;
};

/** Form input. */
export type FormInput = FormItem & {
  __typename?: 'FormInput';
  configAsJson?: Maybe<Scalars['JSON']['output']>;
  customText?: Maybe<Scalars['String']['output']>;
  defaultValue?: Maybe<DefaultValue>;
  formItemType?: Maybe<FormItemType>;
  helpText?: Maybe<Scalars['String']['output']>;
  inputType?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  maximize?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  occurrences?: Maybe<Occurrences>;
  validationRegexp?: Maybe<Scalars['String']['output']>;
};

/** FormItem. */
export type FormItem = {
  formItemType?: Maybe<FormItemType>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Form item set. */
export type FormItemSet = FormItem & {
  __typename?: 'FormItemSet';
  customText?: Maybe<Scalars['String']['output']>;
  formItemType?: Maybe<FormItemType>;
  helpText?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<Maybe<FormItem>>>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  occurrences?: Maybe<Occurrences>;
};

/** Form item type */
export enum FormItemType {
  Input = 'Input',
  ItemSet = 'ItemSet',
  Layout = 'Layout',
  OptionSet = 'OptionSet'
}

/** Form layout. */
export type FormLayout = FormItem & {
  __typename?: 'FormLayout';
  formItemType?: Maybe<FormItemType>;
  items?: Maybe<Array<Maybe<FormItem>>>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Form option set. */
export type FormOptionSet = FormItem & {
  __typename?: 'FormOptionSet';
  expanded?: Maybe<Scalars['Boolean']['output']>;
  formItemType?: Maybe<FormItemType>;
  helpText?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  occurrences?: Maybe<Occurrences>;
  options?: Maybe<Array<Maybe<FormOptionSetOption>>>;
  selection?: Maybe<Occurrences>;
};

/** Form option set option. */
export type FormOptionSetOption = {
  __typename?: 'FormOptionSetOption';
  default?: Maybe<Scalars['Boolean']['output']>;
  helpText?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<Maybe<FormItem>>>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Fragment component data. */
export type FragmentComponentData = {
  __typename?: 'FragmentComponentData';
  fragment?: Maybe<Content>;
  id: Scalars['ID']['output'];
};

/** FulltextDSLExpressionInput type */
export type FulltextDslExpressionInput = {
  fields: Array<InputMaybe<Scalars['String']['input']>>;
  operator?: InputMaybe<DslOperatorType>;
  query: Scalars['String']['input'];
};

/** GeoDistance aggregation input type */
export type GeoDistanceAggregationInput = {
  field: Scalars['String']['input'];
  origin: GeoPointInput;
  ranges: Array<InputMaybe<NumberRangeInput>>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

/** GeoPoint. */
export type GeoPoint = {
  __typename?: 'GeoPoint';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Geo range input type */
export type GeoPointInput = {
  lat: Scalars['String']['input'];
  lon: Scalars['String']['input'];
};

/** GeoPoint Sort Dsl input type */
export type GeoPointSortDslInput = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
};

/** HasValueFilter input type */
export type HasValueFilterInput = {
  booleanValues?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  field: Scalars['String']['input'];
  floatValues?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  intValues?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  stringValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Headless CMS */
export type HeadlessCms = {
  __typename?: 'HeadlessCms';
  get?: Maybe<Content>;
  getChildren?: Maybe<Array<Maybe<Content>>>;
  getChildrenConnection?: Maybe<ContentConnection>;
  getPermissions?: Maybe<Permissions>;
  getSite?: Maybe<Portal_Site>;
  getType?: Maybe<ContentType>;
  getTypes?: Maybe<Array<Maybe<ContentType>>>;
  query?: Maybe<Array<Maybe<Content>>>;
  queryConnection?: Maybe<QueryContentConnection>;
  queryDsl?: Maybe<Array<Maybe<Content>>>;
  queryDslConnection?: Maybe<QueryDslContentConnection>;
  sitemap?: Maybe<Sitemap>;
};


/** Headless CMS */
export type HeadlessCmsGetArgs = {
  key?: InputMaybe<Scalars['ID']['input']>;
};


/** Headless CMS */
export type HeadlessCmsGetChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  key?: InputMaybe<Scalars['ID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Headless CMS */
export type HeadlessCmsGetChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  key?: InputMaybe<Scalars['ID']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Headless CMS */
export type HeadlessCmsGetPermissionsArgs = {
  key?: InputMaybe<Scalars['ID']['input']>;
};


/** Headless CMS */
export type HeadlessCmsGetTypeArgs = {
  name: Scalars['String']['input'];
};


/** Headless CMS */
export type HeadlessCmsQueryArgs = {
  contentTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Headless CMS */
export type HeadlessCmsQueryConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  aggregations?: InputMaybe<Array<InputMaybe<AggregationInput>>>;
  contentTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Headless CMS */
export type HeadlessCmsQueryDslArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<QueryDslInput>;
  sort?: InputMaybe<Array<InputMaybe<SortDslInput>>>;
};


/** Headless CMS */
export type HeadlessCmsQueryDslConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  aggregations?: InputMaybe<Array<InputMaybe<AggregationInput>>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  highlight?: InputMaybe<HighlightInputType>;
  query: QueryDslInput;
  sort?: InputMaybe<Array<InputMaybe<SortDslInput>>>;
};

/** Indicates if the snippet should be HTML encoded: default (no encoding) or html. */
export enum HighlightEncoderType {
  Default = 'default',
  Html = 'html'
}

/** Specifies how text should be broken up in highlight snippets: simple or span (default). */
export enum HighlightFragmenterType {
  Simple = 'simple',
  Span = 'span'
}

/** HighlightInputType input type */
export type HighlightInputType = {
  encoder?: InputMaybe<HighlightEncoderType>;
  fragmentSize?: InputMaybe<Scalars['Int']['input']>;
  fragmenter?: InputMaybe<HighlightFragmenterType>;
  noMatchSize?: InputMaybe<Scalars['Int']['input']>;
  numberOfFragments?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<HighlightOrderType>;
  postTag?: InputMaybe<Scalars['String']['input']>;
  preTag?: InputMaybe<Scalars['String']['input']>;
  properties: Array<InputMaybe<HighlightPropertiesInputType>>;
  requireFieldMatch?: InputMaybe<Scalars['Boolean']['input']>;
  tagsSchema?: InputMaybe<HighlightTagsSchemaType>;
};

/** Sorts highlighted fragments by score when set to score. Defaults to none - will be displayed in the same order in which fragments appear in the property. */
export enum HighlightOrderType {
  None = 'none',
  Score = 'score'
}

/** HighlightProperties input type */
export type HighlightPropertiesInputType = {
  fragmentSize?: InputMaybe<Scalars['Int']['input']>;
  fragmenter?: InputMaybe<HighlightFragmenterType>;
  noMatchSize?: InputMaybe<Scalars['Int']['input']>;
  numberOfFragments?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<HighlightOrderType>;
  postTag?: InputMaybe<Scalars['String']['input']>;
  preTag?: InputMaybe<Scalars['String']['input']>;
  propertyName: Scalars['String']['input'];
  requireFieldMatch?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Set to styled to use the built-in tag schema. */
export enum HighlightTagsSchemaType {
  Styled = 'styled'
}

/** Icon. */
export type Icon = {
  __typename?: 'Icon';
  mimeType?: Maybe<Scalars['String']['output']>;
  modifiedTime?: Maybe<Scalars['String']['output']>;
};

/** IdsFilter input type */
export type IdsFilterInput = {
  values?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Image type. */
export type Image = {
  __typename?: 'Image';
  image?: Maybe<Content>;
  ref?: Maybe<Scalars['String']['output']>;
  style?: Maybe<ImageStyle>;
};

/** Image component data. */
export type ImageComponentData = {
  __typename?: 'ImageComponentData';
  caption?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Media_Image>;
};

/** ImageStyle type. */
export type ImageStyle = {
  __typename?: 'ImageStyle';
  aspectRatio?: Maybe<Scalars['String']['output']>;
  filter?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** InDSLExpressionInput type */
export type InDslExpressionInput = {
  booleanValues?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  boost?: InputMaybe<Scalars['Float']['input']>;
  doubleValues?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  field: Scalars['String']['input'];
  instantValues?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  localDateTimeValues?: InputMaybe<Array<InputMaybe<Scalars['LocalDateTime']['input']>>>;
  localDateValues?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  localTimeValues?: InputMaybe<Array<InputMaybe<Scalars['LocalTime']['input']>>>;
  longValues?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  stringValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Layout component data. */
export type LayoutComponentData = {
  __typename?: 'LayoutComponentData';
  config?: Maybe<LayoutComponentDataConfig>;
  configAsJson?: Maybe<Scalars['JSON']['output']>;
  descriptor: Scalars['String']['output'];
};

/** Layout component config. */
export type LayoutComponentDataConfig = {
  __typename?: 'LayoutComponentDataConfig';
  idebanken?: Maybe<Layout_Idebanken_ComponentDataApplicationConfig>;
};

/** Layout component application config for application ['idebanken'] */
export type Layout_Idebanken_ComponentDataApplicationConfig = {
  __typename?: 'Layout_idebanken_ComponentDataApplicationConfig';
  _2_column?: Maybe<Layout_Idebanken__2_Column>;
  panel_2_column?: Maybe<Layout_Idebanken_Panel_2_Column>;
  single_column?: Maybe<Layout_Idebanken_Single_Column>;
};

/** Layout component application config for application ['idebanken'] and descriptor ['2-column'] */
export type Layout_Idebanken__2_Column = {
  __typename?: 'Layout_idebanken__2_column';
  bgColor?: Maybe<Scalars['String']['output']>;
  breakLeftFirst?: Maybe<Scalars['Boolean']['output']>;
  leftSpan?: Maybe<Scalars['String']['output']>;
};

/** Layout component application config for application ['idebanken'] and descriptor ['panel-2-column'] */
export type Layout_Idebanken_Panel_2_Column = {
  __typename?: 'Layout_idebanken_panel_2_column';
  background?: Maybe<Array<Maybe<Layout_Idebanken_Panel_2_Column_Background>>>;
  leftSpan?: Maybe<Scalars['String']['output']>;
};


/** Layout component application config for application ['idebanken'] and descriptor ['panel-2-column'] */
export type Layout_Idebanken_Panel_2_ColumnBackgroundArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Background (Outer Box / Inner Box) */
export type Layout_Idebanken_Panel_2_Column_Background = {
  __typename?: 'Layout_idebanken_panel_2_column_Background';
  bgColor?: Maybe<Scalars['String']['output']>;
};

/** Layout component application config for application ['idebanken'] and descriptor ['single-column'] */
export type Layout_Idebanken_Single_Column = {
  __typename?: 'Layout_idebanken_single_column';
  bgColor?: Maybe<Scalars['String']['output']>;
};

/** LikeDSLExpressionInput type */
export type LikeDslExpressionInput = {
  boost?: InputMaybe<Scalars['Float']['input']>;
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

/** Link type. */
export type Link = {
  __typename?: 'Link';
  content?: Maybe<Content>;
  media?: Maybe<Media>;
  ref?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

/** Macro type. */
export type Macro = {
  __typename?: 'Macro';
  config?: Maybe<MacroConfig>;
  descriptor?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ref?: Maybe<Scalars['String']['output']>;
};

/** Macro config type. */
export type MacroConfig = {
  __typename?: 'MacroConfig';
  disable?: Maybe<Macro_System_Disable_DataConfig>;
  embed?: Maybe<Macro_System_Embed_DataConfig>;
};

/** Macro descriptor data config for application ['system'] and descriptor ['disable'] */
export type Macro_System_Disable_DataConfig = {
  __typename?: 'Macro_system_disable_DataConfig';
  body?: Maybe<Scalars['String']['output']>;
};

/** Macro descriptor data config for application ['system'] and descriptor ['embed'] */
export type Macro_System_Embed_DataConfig = {
  __typename?: 'Macro_system_embed_DataConfig';
  body?: Maybe<Scalars['String']['output']>;
};

/** MatchAllDSLExpressionInput type */
export type MatchAllDslExpressionInput = {
  boost?: InputMaybe<Scalars['Float']['input']>;
};

/** MaxAggregation input type */
export type MaxAggregationInput = {
  field: Scalars['String']['input'];
};

/** Media type. */
export type Media = {
  __typename?: 'Media';
  content?: Maybe<Content>;
  intent?: Maybe<MediaIntentType>;
};

/** Media focal point. */
export type MediaFocalPoint = {
  __typename?: 'MediaFocalPoint';
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
};

/** Media intent type. */
export enum MediaIntentType {
  Download = 'download',
  Inline = 'inline'
}

/** Media uploader. */
export type MediaUploader = {
  __typename?: 'MediaUploader';
  attachment?: Maybe<Scalars['String']['output']>;
  focalPoint?: Maybe<MediaFocalPoint>;
};

/** Meta fields for a content */
export type MetaFields = {
  __typename?: 'MetaFields';
  baseUrl?: Maybe<Scalars['String']['output']>;
  canonical?: Maybe<Content>;
  description?: Maybe<Scalars['String']['output']>;
  fullTitle: Scalars['String']['output'];
  image?: Maybe<Media_Image>;
  locale?: Maybe<Scalars['String']['output']>;
  openGraph?: Maybe<MetaFields_OpenGraph>;
  robots?: Maybe<MetaFields_Robots>;
  siteName?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  twitter?: Maybe<MetaFields_Twitter>;
  verification?: Maybe<MetaFields_Verification>;
};

/** Meta fields for Open Graph */
export type MetaFields_OpenGraph = {
  __typename?: 'MetaFields_OpenGraph';
  hideImages?: Maybe<Scalars['Boolean']['output']>;
  hideUrl?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** Meta fields for Robots */
export type MetaFields_Robots = {
  __typename?: 'MetaFields_Robots';
  follow?: Maybe<Scalars['Boolean']['output']>;
  index?: Maybe<Scalars['Boolean']['output']>;
};

/** Meta fields for Twitter */
export type MetaFields_Twitter = {
  __typename?: 'MetaFields_Twitter';
  hideImages?: Maybe<Scalars['Boolean']['output']>;
  site?: Maybe<Scalars['String']['output']>;
};

/** Meta fields for Verification */
export type MetaFields_Verification = {
  __typename?: 'MetaFields_Verification';
  google?: Maybe<Scalars['String']['output']>;
};

/** MinAggregation input type */
export type MinAggregationInput = {
  field: Scalars['String']['input'];
};

/** NgramDSLExpressionInput type */
export type NgramDslExpressionInput = {
  fields: Array<InputMaybe<Scalars['String']['input']>>;
  operator?: InputMaybe<DslOperatorType>;
  query: Scalars['String']['input'];
};

/** NotExistsFilter input type */
export type NotExistsFilterInput = {
  field: Scalars['String']['input'];
};

/** Number range input type */
export type NumberRangeInput = {
  from?: InputMaybe<Scalars['Float']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Float']['input']>;
};

/** Occurrences. */
export type Occurrences = {
  __typename?: 'Occurrences';
  maximum?: Maybe<Scalars['Int']['output']>;
  minimum?: Maybe<Scalars['Int']['output']>;
};

/** Page component data. */
export type PageComponentData = {
  __typename?: 'PageComponentData';
  configAsJson?: Maybe<Scalars['JSON']['output']>;
  customized?: Maybe<Scalars['Boolean']['output']>;
  descriptor?: Maybe<Scalars['String']['output']>;
  template?: Maybe<Content>;
};

/** PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNext: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

/** Part component data. */
export type PartComponentData = {
  __typename?: 'PartComponentData';
  config?: Maybe<PartComponentDataConfig>;
  configAsJson?: Maybe<Scalars['JSON']['output']>;
  descriptor: Scalars['String']['output'];
};

/** Part component config. */
export type PartComponentDataConfig = {
  __typename?: 'PartComponentDataConfig';
  idebanken?: Maybe<Part_Idebanken_ComponentDataApplicationConfig>;
};

/** Part component application config for application ['idebanken'] */
export type Part_Idebanken_ComponentDataApplicationConfig = {
  __typename?: 'Part_idebanken_ComponentDataApplicationConfig';
  accordion?: Maybe<Part_Idebanken_Accordion>;
  button?: Maybe<Part_Idebanken_Button>;
  heading?: Maybe<Part_Idebanken_Heading>;
  image?: Maybe<Part_Idebanken_Image>;
  info_box?: Maybe<Part_Idebanken_Info_Box>;
  link_card?: Maybe<Part_Idebanken_Link_Card>;
  text_editor?: Maybe<Part_Idebanken_Text_Editor>;
  tip_panel?: Maybe<Part_Idebanken_Tip_Panel>;
};

/** Part component application config for application ['idebanken'] and descriptor ['accordion'] */
export type Part_Idebanken_Accordion = {
  __typename?: 'Part_idebanken_accordion';
  accordionItems?: Maybe<Array<Maybe<Part_Idebanken_Accordion_AccordionItems>>>;
};


/** Part component application config for application ['idebanken'] and descriptor ['accordion'] */
export type Part_Idebanken_AccordionAccordionItemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Accordion */
export type Part_Idebanken_Accordion_AccordionItems = {
  __typename?: 'Part_idebanken_accordion_AccordionItems';
  header?: Maybe<Scalars['String']['output']>;
  simpleTextEditor?: Maybe<RichText>;
};


/** Accordion */
export type Part_Idebanken_Accordion_AccordionItemsSimpleTextEditorArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Part component application config for application ['idebanken'] and descriptor ['button'] */
export type Part_Idebanken_Button = {
  __typename?: 'Part_idebanken_button';
  blockOptionSet?: Maybe<Part_Idebanken_Button_BlockOptionSet>;
  size?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  variant?: Maybe<Scalars['String']['output']>;
};

/** Select link type */
export type Part_Idebanken_Button_BlockOptionSet = {
  __typename?: 'Part_idebanken_button_BlockOptionSet';
  _selected?: Maybe<Part_Idebanken_Button_BlockOptionSet_OptionEnum>;
  externalLink?: Maybe<Part_Idebanken_Button_ExternalLink>;
  internalLink?: Maybe<Part_Idebanken_Button_InternalLink>;
};

/** Select link type option enum. */
export enum Part_Idebanken_Button_BlockOptionSet_OptionEnum {
  ExternalLink = 'externalLink',
  InternalLink = 'internalLink'
}

/** External URL */
export type Part_Idebanken_Button_ExternalLink = {
  __typename?: 'Part_idebanken_button_ExternalLink';
  url?: Maybe<Scalars['String']['output']>;
};

/** Internal URL */
export type Part_Idebanken_Button_InternalLink = {
  __typename?: 'Part_idebanken_button_InternalLink';
  ideBankContentSelector?: Maybe<Content>;
};

/** Part component application config for application ['idebanken'] and descriptor ['heading'] */
export type Part_Idebanken_Heading = {
  __typename?: 'Part_idebanken_heading';
  level?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['image'] */
export type Part_Idebanken_Image = {
  __typename?: 'Part_idebanken_image';
  image?: Maybe<Content>;
};

/** Part component application config for application ['idebanken'] and descriptor ['info-box'] */
export type Part_Idebanken_Info_Box = {
  __typename?: 'Part_idebanken_info_box';
  infoBoxItems?: Maybe<Array<Maybe<Part_Idebanken_Info_Box_InfoBoxItems>>>;
};


/** Part component application config for application ['idebanken'] and descriptor ['info-box'] */
export type Part_Idebanken_Info_BoxInfoBoxItemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Info-boks */
export type Part_Idebanken_Info_Box_InfoBoxItems = {
  __typename?: 'Part_idebanken_info_box_InfoBoxItems';
  bgColor?: Maybe<Scalars['String']['output']>;
  simpleTextEditor?: Maybe<RichText>;
};


/** Info-boks */
export type Part_Idebanken_Info_Box_InfoBoxItemsSimpleTextEditorArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Part component application config for application ['idebanken'] and descriptor ['link-card'] */
export type Part_Idebanken_Link_Card = {
  __typename?: 'Part_idebanken_link_card';
  blockOptionSet?: Maybe<Part_Idebanken_Link_Card_BlockOptionSet>;
  text?: Maybe<Scalars['String']['output']>;
};

/** Select link type */
export type Part_Idebanken_Link_Card_BlockOptionSet = {
  __typename?: 'Part_idebanken_link_card_BlockOptionSet';
  _selected?: Maybe<Part_Idebanken_Link_Card_BlockOptionSet_OptionEnum>;
  externalLink?: Maybe<Part_Idebanken_Link_Card_ExternalLink>;
  internalLink?: Maybe<Part_Idebanken_Link_Card_InternalLink>;
};

/** Select link type option enum. */
export enum Part_Idebanken_Link_Card_BlockOptionSet_OptionEnum {
  ExternalLink = 'externalLink',
  InternalLink = 'internalLink'
}

/** External URL */
export type Part_Idebanken_Link_Card_ExternalLink = {
  __typename?: 'Part_idebanken_link_card_ExternalLink';
  url?: Maybe<Scalars['String']['output']>;
};

/** Internal URL */
export type Part_Idebanken_Link_Card_InternalLink = {
  __typename?: 'Part_idebanken_link_card_InternalLink';
  ideBankContentSelector?: Maybe<Content>;
};

/** Part component application config for application ['idebanken'] and descriptor ['text-editor'] */
export type Part_Idebanken_Text_Editor = {
  __typename?: 'Part_idebanken_text_editor';
  simpleTextEditor?: Maybe<RichText>;
};


/** Part component application config for application ['idebanken'] and descriptor ['text-editor'] */
export type Part_Idebanken_Text_EditorSimpleTextEditorArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Part component application config for application ['idebanken'] and descriptor ['tip-panel'] */
export type Part_Idebanken_Tip_Panel = {
  __typename?: 'Part_idebanken_tip_panel';
  bgColor?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  panel?: Maybe<Array<Maybe<Part_Idebanken_Tip_Panel_Panel>>>;
  reverse?: Maybe<Scalars['Boolean']['output']>;
};


/** Part component application config for application ['idebanken'] and descriptor ['tip-panel'] */
export type Part_Idebanken_Tip_PanelPanelArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Panel */
export type Part_Idebanken_Tip_Panel_Panel = {
  __typename?: 'Part_idebanken_tip_panel_Panel';
  bgColor?: Maybe<Scalars['String']['output']>;
  simpleTextEditor?: Maybe<RichText>;
};


/** Panel */
export type Part_Idebanken_Tip_Panel_PanelSimpleTextEditorArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** PathMatchDSLExpressionInput type */
export type PathMatchDslExpressionInput = {
  boost?: InputMaybe<Scalars['Float']['input']>;
  field: Scalars['String']['input'];
  minimumMatch?: InputMaybe<Scalars['Int']['input']>;
  path: Scalars['String']['input'];
};

/** Permission. */
export enum Permission {
  Create = 'CREATE',
  Delete = 'DELETE',
  Modify = 'MODIFY',
  Publish = 'PUBLISH',
  Read = 'READ',
  ReadPermissions = 'READ_PERMISSIONS',
  WritePermissions = 'WRITE_PERMISSIONS'
}

/** Permissions. */
export type Permissions = {
  __typename?: 'Permissions';
  inheritsPermissions?: Maybe<Scalars['Boolean']['output']>;
  permissions?: Maybe<Array<Maybe<AccessControlEntry>>>;
};

/** Principal key. */
export type PrincipalKey = {
  __typename?: 'PrincipalKey';
  idProvider?: Maybe<Scalars['String']['output']>;
  principalId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<PrincipalType>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Principal type. */
export enum PrincipalType {
  Group = 'group',
  Role = 'role',
  User = 'user'
}

/** Process HTML input type */
export type ProcessHtmlInput = {
  imageSizes?: InputMaybe<Scalars['String']['input']>;
  imageWidths?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  type?: InputMaybe<UrlType>;
};

/** Publish information. */
export type PublishInfo = {
  __typename?: 'PublishInfo';
  first?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};

/** Query */
export type Query = {
  __typename?: 'Query';
  guillotine?: Maybe<HeadlessCms>;
};


/** Query */
export type QueryGuillotineArgs = {
  siteKey?: InputMaybe<Scalars['String']['input']>;
};

/** QueryContentConnection. */
export type QueryContentConnection = {
  __typename?: 'QueryContentConnection';
  aggregationsAsJson?: Maybe<Scalars['JSON']['output']>;
  edges?: Maybe<Array<Maybe<ContentEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int']['output'];
};

/** QueryDSLContentConnection. */
export type QueryDslContentConnection = {
  __typename?: 'QueryDSLContentConnection';
  aggregationsAsJson?: Maybe<Scalars['JSON']['output']>;
  edges?: Maybe<Array<Maybe<ContentEdge>>>;
  highlightAsJson?: Maybe<Scalars['JSON']['output']>;
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int']['output'];
};

/** QueryDSLInput type */
export type QueryDslInput = {
  boolean?: InputMaybe<BooleanDslExpressionInput>;
  exists?: InputMaybe<ExistsDslExpressionInput>;
  fulltext?: InputMaybe<FulltextDslExpressionInput>;
  in?: InputMaybe<InDslExpressionInput>;
  like?: InputMaybe<LikeDslExpressionInput>;
  matchAll?: InputMaybe<MatchAllDslExpressionInput>;
  ngram?: InputMaybe<NgramDslExpressionInput>;
  pathMatch?: InputMaybe<PathMatchDslExpressionInput>;
  range?: InputMaybe<RangeDslExpressionInput>;
  stemmed?: InputMaybe<StemmedDslExpressionInput>;
  term?: InputMaybe<TermDslExpressionInput>;
};

/** Range aggregation input type */
export type RangeAggregationInput = {
  field: Scalars['String']['input'];
  ranges?: InputMaybe<Array<InputMaybe<NumberRangeInput>>>;
};

/** RangeDSLExpressionInput type */
export type RangeDslExpressionInput = {
  boost?: InputMaybe<Scalars['Float']['input']>;
  field: Scalars['String']['input'];
  gt?: InputMaybe<DslExpressionValueInput>;
  gte?: InputMaybe<DslExpressionValueInput>;
  lt?: InputMaybe<DslExpressionValueInput>;
  lte?: InputMaybe<DslExpressionValueInput>;
};

/** RichText type. */
export type RichText = {
  __typename?: 'RichText';
  images?: Maybe<Array<Maybe<Image>>>;
  links?: Maybe<Array<Maybe<Link>>>;
  macros?: Maybe<Array<Maybe<Macro>>>;
  macrosAsJson?: Maybe<Scalars['JSON']['output']>;
  processedHtml?: Maybe<Scalars['String']['output']>;
  raw?: Maybe<Scalars['String']['output']>;
};

/** Site configurator. */
export type SiteConfigurator = {
  __typename?: 'SiteConfigurator';
  applicationKey?: Maybe<Scalars['String']['output']>;
  configAsJson?: Maybe<Scalars['JSON']['output']>;
};

/** Sitemap */
export type Sitemap = {
  __typename?: 'Sitemap';
  baseUrl?: Maybe<Scalars['String']['output']>;
  urlset?: Maybe<Array<Maybe<Sitemap_Url>>>;
};


/** Sitemap */
export type SitemapUrlsetArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
};

/** Sitemap URL item */
export type Sitemap_Url = {
  __typename?: 'Sitemap_Url';
  changefreq?: Maybe<Scalars['String']['output']>;
  lastmod?: Maybe<Scalars['DateTime']['output']>;
  path: Scalars['String']['output'];
  priority?: Maybe<Scalars['String']['output']>;
};

/** Sort Dsl input type */
export type SortDslInput = {
  direction?: InputMaybe<DslSortDirectionType>;
  field: Scalars['String']['input'];
  location?: InputMaybe<GeoPointSortDslInput>;
  unit?: InputMaybe<DslGeoPointDistanceType>;
};

/** Stats aggregation input type */
export type StatsAggregationInput = {
  field: Scalars['String']['input'];
};

/** StemmedDSLExpressionInput type */
export type StemmedDslExpressionInput = {
  boost?: InputMaybe<Scalars['Float']['input']>;
  fields: Array<InputMaybe<Scalars['String']['input']>>;
  language: Scalars['String']['input'];
  operator?: InputMaybe<DslOperatorType>;
  query: Scalars['String']['input'];
};

/** TermDSLExpressionInput type */
export type TermDslExpressionInput = {
  boost?: InputMaybe<Scalars['Float']['input']>;
  field: Scalars['String']['input'];
  value: DslExpressionValueInput;
};

/** Terms aggregation input type */
export type TermsAggregationInput = {
  field: Scalars['String']['input'];
  minDocCount?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

/** Text component data. */
export type TextComponentData = {
  __typename?: 'TextComponentData';
  value: RichText;
};


/** Text component data. */
export type TextComponentDataValueArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** UntypedContent */
export type UntypedContent = Content & {
  __typename?: 'UntypedContent';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** UntypedContent */
export type UntypedContent_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** UntypedContent */
export type UntypedContentChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** UntypedContent */
export type UntypedContentChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** UntypedContent */
export type UntypedContentComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** UntypedContent */
export type UntypedContentPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** UntypedContent */
export type UntypedContentPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** URL type. */
export enum UrlType {
  Absolute = 'absolute',
  Server = 'server'
}

/** ValueCount Aggregation input type */
export type ValueCountAggregationInput = {
  field: Scalars['String']['input'];
};

/** XDataApplicationConfig for application ['base'] */
export type XData_Base_ApplicationConfig = {
  __typename?: 'XData_base_ApplicationConfig';
  gpsInfo?: Maybe<XData_Base_GpsInfo_DataConfig>;
};

/** Extra data config for application ['base}'] and descriptor ['gpsInfo'] */
export type XData_Base_GpsInfo_DataConfig = {
  __typename?: 'XData_base_gpsInfo_DataConfig';
  altitude?: Maybe<Scalars['String']['output']>;
  direction?: Maybe<Scalars['String']['output']>;
  geoPoint?: Maybe<GeoPoint>;
};

/** XDataApplicationConfig for application ['com.enonic.app.metafields'] */
export type XData_Com_Enonic_App_Metafields_ApplicationConfig = {
  __typename?: 'XData_com_enonic_app_metafields_ApplicationConfig';
  meta_data?: Maybe<XData_Com_Enonic_App_Metafields_Meta_Data_DataConfig>;
};

/** Extra data config for application ['com.enonic.app.metafields}'] and descriptor ['meta-data'] */
export type XData_Com_Enonic_App_Metafields_Meta_Data_DataConfig = {
  __typename?: 'XData_com_enonic_app_metafields_meta_data_DataConfig';
  blockRobots?: Maybe<Scalars['Boolean']['output']>;
  seoContentForCanonicalUrl?: Maybe<Content>;
  seoDescription?: Maybe<Scalars['String']['output']>;
  seoImage?: Maybe<Content>;
  seoTitle?: Maybe<Scalars['String']['output']>;
};

/** XDataApplicationConfig for application ['media'] */
export type XData_Media_ApplicationConfig = {
  __typename?: 'XData_media_ApplicationConfig';
  cameraInfo?: Maybe<XData_Media_CameraInfo_DataConfig>;
  imageInfo?: Maybe<XData_Media_ImageInfo_DataConfig>;
};

/** Extra data config for application ['media}'] and descriptor ['cameraInfo'] */
export type XData_Media_CameraInfo_DataConfig = {
  __typename?: 'XData_media_cameraInfo_DataConfig';
  aperture?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  autoFlashCompensation?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['LocalDateTime']['output']>;
  exposureBias?: Maybe<Scalars['String']['output']>;
  exposureMode?: Maybe<Scalars['String']['output']>;
  exposureProgram?: Maybe<Scalars['String']['output']>;
  flash?: Maybe<Scalars['String']['output']>;
  focalLength?: Maybe<Scalars['String']['output']>;
  focalLength35?: Maybe<Scalars['String']['output']>;
  focusDistance?: Maybe<Scalars['String']['output']>;
  iso?: Maybe<Scalars['String']['output']>;
  lens?: Maybe<Scalars['String']['output']>;
  make?: Maybe<Scalars['String']['output']>;
  meteringMode?: Maybe<Scalars['String']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  orientation?: Maybe<Scalars['String']['output']>;
  shootingMode?: Maybe<Scalars['String']['output']>;
  shutterTime?: Maybe<Scalars['String']['output']>;
  whiteBalance?: Maybe<Scalars['String']['output']>;
};


/** Extra data config for application ['media}'] and descriptor ['cameraInfo'] */
export type XData_Media_CameraInfo_DataConfigApertureArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Extra data config for application ['media}'] and descriptor ['imageInfo'] */
export type XData_Media_ImageInfo_DataConfig = {
  __typename?: 'XData_media_imageInfo_DataConfig';
  byteSize?: Maybe<Scalars['String']['output']>;
  colorSpace?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  contentType?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fileSource?: Maybe<Scalars['String']['output']>;
  imageHeight?: Maybe<Scalars['String']['output']>;
  imageWidth?: Maybe<Scalars['String']['output']>;
  pixelSize?: Maybe<Scalars['String']['output']>;
};


/** Extra data config for application ['media}'] and descriptor ['imageInfo'] */
export type XData_Media_ImageInfo_DataConfigColorSpaceArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Folder - base:folder */
export type Base_Folder = Content & {
  __typename?: 'base_Folder';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Folder - base:folder */
export type Base_Folder_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Folder - base:folder */
export type Base_FolderChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Folder - base:folder */
export type Base_FolderChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Folder - base:folder */
export type Base_FolderComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Folder - base:folder */
export type Base_FolderPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Folder - base:folder */
export type Base_FolderPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Media - base:media */
export type Base_Media = Content & {
  __typename?: 'base_Media';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Media - base:media */
export type Base_Media_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Media - base:media */
export type Base_MediaChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Media - base:media */
export type Base_MediaChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Media - base:media */
export type Base_MediaComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Media - base:media */
export type Base_MediaPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Media - base:media */
export type Base_MediaPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Shortcut - base:shortcut */
export type Base_Shortcut = Content & {
  __typename?: 'base_Shortcut';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Base_Shortcut_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Shortcut - base:shortcut */
export type Base_Shortcut_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Shortcut - base:shortcut */
export type Base_ShortcutChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Shortcut - base:shortcut */
export type Base_ShortcutChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Shortcut - base:shortcut */
export type Base_ShortcutComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Shortcut - base:shortcut */
export type Base_ShortcutPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Shortcut - base:shortcut */
export type Base_ShortcutPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Shortcut - base:shortcut data */
export type Base_Shortcut_Data = {
  __typename?: 'base_Shortcut_Data';
  parameters?: Maybe<Array<Maybe<Base_Shortcut_Parameters>>>;
  target?: Maybe<Content>;
};


/** Shortcut - base:shortcut data */
export type Base_Shortcut_DataParametersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Parameters */
export type Base_Shortcut_Parameters = {
  __typename?: 'base_Shortcut_Parameters';
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Structured - base:structured */
export type Base_Structured = Content & {
  __typename?: 'base_Structured';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Structured - base:structured */
export type Base_Structured_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Structured - base:structured */
export type Base_StructuredChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Structured - base:structured */
export type Base_StructuredChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Structured - base:structured */
export type Base_StructuredComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Structured - base:structured */
export type Base_StructuredPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Structured - base:structured */
export type Base_StructuredPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Unstructured - base:unstructured */
export type Base_Unstructured = Content & {
  __typename?: 'base_Unstructured';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Unstructured - base:unstructured */
export type Base_Unstructured_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Unstructured - base:unstructured */
export type Base_UnstructuredChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Unstructured - base:unstructured */
export type Base_UnstructuredChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Unstructured - base:unstructured */
export type Base_UnstructuredComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Unstructured - base:unstructured */
export type Base_UnstructuredPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Unstructured - base:unstructured */
export type Base_UnstructuredPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Guide - idebanken:guide */
export type Idebanken_Guide = Content & {
  __typename?: 'idebanken_Guide';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_Guide_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Guide - idebanken:guide */
export type Idebanken_Guide_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Guide - idebanken:guide */
export type Idebanken_GuideChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Guide - idebanken:guide */
export type Idebanken_GuideChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Guide - idebanken:guide */
export type Idebanken_GuideComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Guide - idebanken:guide */
export type Idebanken_GuidePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Guide - idebanken:guide */
export type Idebanken_GuidePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Guide - idebanken:guide data */
export type Idebanken_Guide_Data = {
  __typename?: 'idebanken_Guide_Data';
  ingress?: Maybe<RichText>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Guide - idebanken:guide data */
export type Idebanken_Guide_DataIngressArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Archive - media:archive */
export type Media_Archive = Content & {
  __typename?: 'media_Archive';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Archive_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Archive - media:archive */
export type Media_Archive_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Archive - media:archive */
export type Media_ArchiveChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Archive - media:archive */
export type Media_ArchiveChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Archive - media:archive */
export type Media_ArchiveComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Archive - media:archive */
export type Media_ArchiveMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Archive - media:archive */
export type Media_ArchivePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Archive - media:archive */
export type Media_ArchivePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Archive - media:archive data */
export type Media_Archive_Data = {
  __typename?: 'media_Archive_Data';
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Archive - media:archive data */
export type Media_Archive_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Audio - media:audio */
export type Media_Audio = Content & {
  __typename?: 'media_Audio';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Audio_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Audio - media:audio */
export type Media_Audio_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Audio - media:audio */
export type Media_AudioChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Audio - media:audio */
export type Media_AudioChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Audio - media:audio */
export type Media_AudioComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Audio - media:audio */
export type Media_AudioMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Audio - media:audio */
export type Media_AudioPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Audio - media:audio */
export type Media_AudioPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Audio - media:audio data */
export type Media_Audio_Data = {
  __typename?: 'media_Audio_Data';
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Audio - media:audio data */
export type Media_Audio_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Code - media:code */
export type Media_Code = Content & {
  __typename?: 'media_Code';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Code_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Code - media:code */
export type Media_Code_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Code - media:code */
export type Media_CodeChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Code - media:code */
export type Media_CodeChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Code - media:code */
export type Media_CodeComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Code - media:code */
export type Media_CodeMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Code - media:code */
export type Media_CodePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Code - media:code */
export type Media_CodePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Code - media:code data */
export type Media_Code_Data = {
  __typename?: 'media_Code_Data';
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Code - media:code data */
export type Media_Code_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Data - media:data */
export type Media_Data = Content & {
  __typename?: 'media_Data';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Data_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Data - media:data */
export type Media_Data_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Data - media:data */
export type Media_DataChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Data - media:data */
export type Media_DataChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Data - media:data */
export type Media_DataComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Data - media:data */
export type Media_DataMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Data - media:data */
export type Media_DataPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Data - media:data */
export type Media_DataPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Data - media:data data */
export type Media_Data_Data = {
  __typename?: 'media_Data_Data';
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Data - media:data data */
export type Media_Data_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Document - media:document */
export type Media_Document = Content & {
  __typename?: 'media_Document';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Document_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Document - media:document */
export type Media_Document_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Document - media:document */
export type Media_DocumentChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Document - media:document */
export type Media_DocumentChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Document - media:document */
export type Media_DocumentComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Document - media:document */
export type Media_DocumentMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Document - media:document */
export type Media_DocumentPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Document - media:document */
export type Media_DocumentPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Document - media:document data */
export type Media_Document_Data = {
  __typename?: 'media_Document_Data';
  abstract?: Maybe<Scalars['String']['output']>;
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Document - media:document data */
export type Media_Document_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Executable - media:executable */
export type Media_Executable = Content & {
  __typename?: 'media_Executable';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Executable_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Executable - media:executable */
export type Media_Executable_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Executable - media:executable */
export type Media_ExecutableChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Executable - media:executable */
export type Media_ExecutableChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Executable - media:executable */
export type Media_ExecutableComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Executable - media:executable */
export type Media_ExecutableMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Executable - media:executable */
export type Media_ExecutablePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Executable - media:executable */
export type Media_ExecutablePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Executable - media:executable data */
export type Media_Executable_Data = {
  __typename?: 'media_Executable_Data';
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Executable - media:executable data */
export type Media_Executable_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Image - media:image */
export type Media_Image = Content & {
  __typename?: 'media_Image';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Image_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Image - media:image */
export type Media_Image_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Image - media:image */
export type Media_ImageChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Image - media:image */
export type Media_ImageChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Image - media:image */
export type Media_ImageComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Image - media:image */
export type Media_ImageImageUrlArgs = {
  background?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  quality?: InputMaybe<Scalars['Int']['input']>;
  scale: Scalars['String']['input'];
  type?: InputMaybe<UrlType>;
};


/** Image - media:image */
export type Media_ImageMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Image - media:image */
export type Media_ImagePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Image - media:image */
export type Media_ImagePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Image - media:image data */
export type Media_Image_Data = {
  __typename?: 'media_Image_Data';
  altText?: Maybe<Scalars['String']['output']>;
  artist?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  caption?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaUploader>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Image - media:image data */
export type Media_Image_DataArtistArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Image - media:image data */
export type Media_Image_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Presentation - media:presentation */
export type Media_Presentation = Content & {
  __typename?: 'media_Presentation';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Presentation_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Presentation - media:presentation */
export type Media_Presentation_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Presentation - media:presentation */
export type Media_PresentationChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Presentation - media:presentation */
export type Media_PresentationChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Presentation - media:presentation */
export type Media_PresentationComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Presentation - media:presentation */
export type Media_PresentationMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Presentation - media:presentation */
export type Media_PresentationPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Presentation - media:presentation */
export type Media_PresentationPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Presentation - media:presentation data */
export type Media_Presentation_Data = {
  __typename?: 'media_Presentation_Data';
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Presentation - media:presentation data */
export type Media_Presentation_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Spreadsheet - media:spreadsheet */
export type Media_Spreadsheet = Content & {
  __typename?: 'media_Spreadsheet';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Spreadsheet_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Spreadsheet - media:spreadsheet */
export type Media_Spreadsheet_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Spreadsheet - media:spreadsheet */
export type Media_SpreadsheetChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Spreadsheet - media:spreadsheet */
export type Media_SpreadsheetChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Spreadsheet - media:spreadsheet */
export type Media_SpreadsheetComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Spreadsheet - media:spreadsheet */
export type Media_SpreadsheetMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Spreadsheet - media:spreadsheet */
export type Media_SpreadsheetPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Spreadsheet - media:spreadsheet */
export type Media_SpreadsheetPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Spreadsheet - media:spreadsheet data */
export type Media_Spreadsheet_Data = {
  __typename?: 'media_Spreadsheet_Data';
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Spreadsheet - media:spreadsheet data */
export type Media_Spreadsheet_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Text - media:text */
export type Media_Text = Content & {
  __typename?: 'media_Text';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Text_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Text - media:text */
export type Media_Text_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Text - media:text */
export type Media_TextChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Text - media:text */
export type Media_TextChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Text - media:text */
export type Media_TextComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Text - media:text */
export type Media_TextMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Text - media:text */
export type Media_TextPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Text - media:text */
export type Media_TextPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Text - media:text data */
export type Media_Text_Data = {
  __typename?: 'media_Text_Data';
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Text - media:text data */
export type Media_Text_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Unknown - media:unknown */
export type Media_Unknown = Content & {
  __typename?: 'media_Unknown';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Unknown_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Unknown - media:unknown */
export type Media_Unknown_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Unknown - media:unknown */
export type Media_UnknownChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Unknown - media:unknown */
export type Media_UnknownChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Unknown - media:unknown */
export type Media_UnknownComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Unknown - media:unknown */
export type Media_UnknownMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Unknown - media:unknown */
export type Media_UnknownPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Unknown - media:unknown */
export type Media_UnknownPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Unknown - media:unknown data */
export type Media_Unknown_Data = {
  __typename?: 'media_Unknown_Data';
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Unknown - media:unknown data */
export type Media_Unknown_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Vector - media:vector */
export type Media_Vector = Content & {
  __typename?: 'media_Vector';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Vector_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Vector - media:vector */
export type Media_Vector_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Vector - media:vector */
export type Media_VectorChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Vector - media:vector */
export type Media_VectorChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Vector - media:vector */
export type Media_VectorComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Vector - media:vector */
export type Media_VectorMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Vector - media:vector */
export type Media_VectorPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Vector - media:vector */
export type Media_VectorPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Vector - media:vector data */
export type Media_Vector_Data = {
  __typename?: 'media_Vector_Data';
  artist?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  caption?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<Scalars['String']['output']>;
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Vector - media:vector data */
export type Media_Vector_DataArtistArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Vector - media:vector data */
export type Media_Vector_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Video - media:video */
export type Media_Video = Content & {
  __typename?: 'media_Video';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Media_Video_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Video - media:video */
export type Media_Video_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Video - media:video */
export type Media_VideoChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Video - media:video */
export type Media_VideoChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Video - media:video */
export type Media_VideoComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Video - media:video */
export type Media_VideoMediaUrlArgs = {
  download?: InputMaybe<Scalars['Boolean']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};


/** Video - media:video */
export type Media_VideoPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Video - media:video */
export type Media_VideoPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Video - media:video data */
export type Media_Video_Data = {
  __typename?: 'media_Video_Data';
  media?: Maybe<Content>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Video - media:video data */
export type Media_Video_DataTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Fragment - portal:fragment */
export type Portal_Fragment = Content & {
  __typename?: 'portal_Fragment';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Fragment - portal:fragment */
export type Portal_Fragment_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Fragment - portal:fragment */
export type Portal_FragmentChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Fragment - portal:fragment */
export type Portal_FragmentChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Fragment - portal:fragment */
export type Portal_FragmentComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Fragment - portal:fragment */
export type Portal_FragmentPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Fragment - portal:fragment */
export type Portal_FragmentPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Page-template - portal:page-template */
export type Portal_PageTemplate = Content & {
  __typename?: 'portal_PageTemplate';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Portal_PageTemplate_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Page-template - portal:page-template */
export type Portal_PageTemplate_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Page-template - portal:page-template */
export type Portal_PageTemplateChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Page-template - portal:page-template */
export type Portal_PageTemplateChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Page-template - portal:page-template */
export type Portal_PageTemplateComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Page-template - portal:page-template */
export type Portal_PageTemplatePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Page-template - portal:page-template */
export type Portal_PageTemplatePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Page-template - portal:page-template data */
export type Portal_PageTemplate_Data = {
  __typename?: 'portal_PageTemplate_Data';
  supports?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Page-template - portal:page-template data */
export type Portal_PageTemplate_DataSupportsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Site - portal:site */
export type Portal_Site = Content & {
  __typename?: 'portal_Site';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Portal_Site_Data>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Site - portal:site */
export type Portal_Site_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Site - portal:site */
export type Portal_SiteChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Site - portal:site */
export type Portal_SiteChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Site - portal:site */
export type Portal_SiteComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Site - portal:site */
export type Portal_SitePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Site - portal:site */
export type Portal_SitePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Site - portal:site data */
export type Portal_Site_Data = {
  __typename?: 'portal_Site_Data';
  description?: Maybe<Scalars['String']['output']>;
};

/** Template-folder - portal:template-folder */
export type Portal_TemplateFolder = Content & {
  __typename?: 'portal_TemplateFolder';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  dataAsJson?: Maybe<Scalars['JSON']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasChildren?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  metaFields?: Maybe<MetaFields>;
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<PrincipalKey>;
  owner?: Maybe<PrincipalKey>;
  pageAsJson?: Maybe<Scalars['JSON']['output']>;
  pageTemplate?: Maybe<Content>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Content>;
  permissions?: Maybe<Permissions>;
  publish?: Maybe<PublishInfo>;
  site?: Maybe<Portal_Site>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Template-folder - portal:template-folder */
export type Portal_TemplateFolder_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Template-folder - portal:template-folder */
export type Portal_TemplateFolderChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Template-folder - portal:template-folder */
export type Portal_TemplateFolderChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Template-folder - portal:template-folder */
export type Portal_TemplateFolderComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Template-folder - portal:template-folder */
export type Portal_TemplateFolderPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Template-folder - portal:template-folder */
export type Portal_TemplateFolderPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};
