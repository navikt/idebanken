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

/** Alert banner configuration */
export type AlertBanner = {
  __typename?: 'AlertBanner';
  closeable?: Maybe<Scalars['Boolean']['output']>;
  hash?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

/** Article card */
export type Article_Card = {
  __typename?: 'Article_card';
  description?: Maybe<Scalars['String']['output']>;
  external?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<ResolvedMedia>;
  publicationDate?: Maybe<Scalars['String']['output']>;
  themeTags?: Maybe<Array<Maybe<Tag>>>;
  title?: Maybe<Scalars['String']['output']>;
  typeTags?: Maybe<Array<Maybe<Tag>>>;
  url?: Maybe<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  idebanken?: Maybe<XData_Idebanken_ApplicationConfig>;
  media?: Maybe<XData_Media_ApplicationConfig>;
  org_idebanken_app?: Maybe<XData_Org_Idebanken_App_ApplicationConfig>;
};

/** Filter input type */
export type FilterInput = {
  boolean?: InputMaybe<BooleanFilterInput>;
  exists?: InputMaybe<ExistsFilterInput>;
  hasValue?: InputMaybe<HasValueFilterInput>;
  ids?: InputMaybe<IdsFilterInput>;
  notExists?: InputMaybe<NotExistsFilterInput>;
};

/** Footer configuration */
export type Footer = {
  __typename?: 'Footer';
  footerText?: Maybe<Scalars['String']['output']>;
  linkGroups: Array<LinkGroups>;
  newsletterSubscribeLink?: Maybe<ResolvedLinkSelector>;
  newsletterSubscribeText?: Maybe<Scalars['String']['output']>;
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

/** Header configuration */
export type Header = {
  __typename?: 'Header';
  linkGroups: Array<LinkGroups>;
  linksBottom: Array<ResolvedLinkSelector>;
};

/** Headless CMS */
export type HeadlessCms = {
  __typename?: 'HeadlessCms';
  footer?: Maybe<Footer>;
  get?: Maybe<Content>;
  getChildren?: Maybe<Array<Maybe<Content>>>;
  getChildrenConnection?: Maybe<ContentConnection>;
  getPermissions?: Maybe<Permissions>;
  getSite?: Maybe<Portal_Site>;
  getType?: Maybe<ContentType>;
  getTypes?: Maybe<Array<Maybe<ContentType>>>;
  header?: Maybe<Header>;
  query?: Maybe<Array<Maybe<Content>>>;
  queryConnection?: Maybe<QueryContentConnection>;
  queryDsl?: Maybe<Array<Maybe<Content>>>;
  queryDslConnection?: Maybe<QueryDslContentConnection>;
  robotstxt?: Maybe<RobotsTxt>;
  siteConfiguration: SiteConfiguration;
  sitemap?: Maybe<Sitemap>;
  themeTags: Array<Tag>;
  typeTags: Array<Tag>;
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
  org_idebanken_app_extensions?: Maybe<Layout_Org_Idebanken_App_Extensions_ComponentDataApplicationConfig>;
};

/** Layout component application config for application ['idebanken'] */
export type Layout_Idebanken_ComponentDataApplicationConfig = {
  __typename?: 'Layout_idebanken_ComponentDataApplicationConfig';
  _2_column?: Maybe<Layout_Idebanken__2_Column>;
  _3_column?: Maybe<Layout_Idebanken__3_Column>;
  card?: Maybe<Layout_Idebanken_Card>;
  single_column?: Maybe<Layout_Idebanken_Single_Column>;
};

/** Layout component application config for application ['idebanken'] and descriptor ['2-column'] */
export type Layout_Idebanken__2_Column = {
  __typename?: 'Layout_idebanken__2_column';
  bgColor?: Maybe<Scalars['String']['output']>;
  boxColor?: Maybe<Scalars['String']['output']>;
  breakLeftFirst?: Maybe<Scalars['Boolean']['output']>;
  leftSpan?: Maybe<Scalars['String']['output']>;
  noGutters?: Maybe<Scalars['Boolean']['output']>;
  overrideWidth?: Maybe<Scalars['String']['output']>;
  paddingBottom?: Maybe<Scalars['String']['output']>;
  paddingTop?: Maybe<Scalars['String']['output']>;
  separator?: Maybe<Scalars['Boolean']['output']>;
  xAlignment?: Maybe<Scalars['String']['output']>;
  yAlignment?: Maybe<Scalars['String']['output']>;
};

/** Layout component application config for application ['idebanken'] and descriptor ['3-column'] */
export type Layout_Idebanken__3_Column = {
  __typename?: 'Layout_idebanken__3_column';
  bgColor?: Maybe<Scalars['String']['output']>;
  boxColor?: Maybe<Scalars['String']['output']>;
  noGutters?: Maybe<Scalars['Boolean']['output']>;
  overrideWidth?: Maybe<Scalars['String']['output']>;
  paddingBottom?: Maybe<Scalars['String']['output']>;
  paddingTop?: Maybe<Scalars['String']['output']>;
  separator?: Maybe<Scalars['Boolean']['output']>;
  stackOrder?: Maybe<Scalars['String']['output']>;
  xAlignment?: Maybe<Scalars['String']['output']>;
  yAlignment?: Maybe<Scalars['String']['output']>;
};

/** Layout component application config for application ['idebanken'] and descriptor ['card'] */
export type Layout_Idebanken_Card = {
  __typename?: 'Layout_idebanken_card';
  bgColor?: Maybe<Scalars['String']['output']>;
  centerHalfWidth?: Maybe<Scalars['Boolean']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  highlightedLayout?: Maybe<Layout_Idebanken_Card_HighlightedLayout>;
  noGutters?: Maybe<Scalars['Boolean']['output']>;
  overrideWidth?: Maybe<Scalars['String']['output']>;
  paddingBottom?: Maybe<Scalars['String']['output']>;
  paddingTop?: Maybe<Scalars['String']['output']>;
  prefix?: Maybe<Scalars['String']['output']>;
  xAlignment?: Maybe<Scalars['String']['output']>;
  yAlignment?: Maybe<Scalars['String']['output']>;
};

/** Fremhevet / normal */
export type Layout_Idebanken_Card_HighlightedLayout = {
  __typename?: 'Layout_idebanken_card_HighlightedLayout';
  _selected?: Maybe<Layout_Idebanken_Card_HighlightedLayout_OptionEnum>;
  plain?: Maybe<Scalars['String']['output']>;
  shadow?: Maybe<Layout_Idebanken_Card_Shadow>;
};

/** Fremhevet / normal option enum. */
export enum Layout_Idebanken_Card_HighlightedLayout_OptionEnum {
  Plain = 'plain',
  Shadow = 'shadow'
}

/** Fremhevet (skygge) */
export type Layout_Idebanken_Card_Shadow = {
  __typename?: 'Layout_idebanken_card_Shadow';
  headingColor?: Maybe<Scalars['String']['output']>;
};

/** Layout component application config for application ['idebanken'] and descriptor ['single-column'] */
export type Layout_Idebanken_Single_Column = {
  __typename?: 'Layout_idebanken_single_column';
  bgColor?: Maybe<Scalars['String']['output']>;
  boxColor?: Maybe<Scalars['String']['output']>;
  noGutters?: Maybe<Scalars['Boolean']['output']>;
  overrideWidth?: Maybe<Scalars['String']['output']>;
  paddingBottom?: Maybe<Scalars['String']['output']>;
  paddingTop?: Maybe<Scalars['String']['output']>;
  xAlignment?: Maybe<Scalars['String']['output']>;
  yAlignment?: Maybe<Scalars['String']['output']>;
};

/** Layout component application config for application ['org.idebanken.app.extensions'] */
export type Layout_Org_Idebanken_App_Extensions_ComponentDataApplicationConfig = {
  __typename?: 'Layout_org_idebanken_app_extensions_ComponentDataApplicationConfig';
  banner?: Maybe<Layout_Org_Idebanken_App_Extensions_Banner>;
  box?: Maybe<Layout_Org_Idebanken_App_Extensions_Box>;
  open_close?: Maybe<Layout_Org_Idebanken_App_Extensions_Open_Close>;
};

/** Layout component application config for application ['org.idebanken.app.extensions'] and descriptor ['banner'] */
export type Layout_Org_Idebanken_App_Extensions_Banner = {
  __typename?: 'Layout_org_idebanken_app_extensions_banner';
  bgVariant?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Layout component application config for application ['org.idebanken.app.extensions'] and descriptor ['box'] */
export type Layout_Org_Idebanken_App_Extensions_Box = {
  __typename?: 'Layout_org_idebanken_app_extensions_box';
  margin?: Maybe<Scalars['String']['output']>;
  padding?: Maybe<Scalars['String']['output']>;
};

/** Layout component application config for application ['org.idebanken.app.extensions'] and descriptor ['open-close'] */
export type Layout_Org_Idebanken_App_Extensions_Open_Close = {
  __typename?: 'Layout_org_idebanken_app_extensions_open_close';
  bgColor?: Maybe<Scalars['String']['output']>;
  borderAbove?: Maybe<Scalars['Boolean']['output']>;
  borderBelow?: Maybe<Scalars['Boolean']['output']>;
  display?: Maybe<Scalars['String']['output']>;
  textColor?: Maybe<Scalars['String']['output']>;
  textSize?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
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

/** Link groups */
export type LinkGroups = {
  __typename?: 'LinkGroups';
  links: Array<ResolvedLinkSelector>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Overridable content link */
export type Link_Card = {
  __typename?: 'Link_card';
  description?: Maybe<Scalars['String']['output']>;
  external: Scalars['Boolean']['output'];
  icon?: Maybe<ResolvedMedia>;
  image?: Maybe<ResolvedMedia>;
  lang?: Maybe<Scalars['String']['output']>;
  themeTags: Array<Tag>;
  title: Scalars['String']['output'];
  typeTags: Array<Tag>;
  url: Scalars['String']['output'];
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
  cookiebot_declaration?: Maybe<Macro_No_Seeds_Cookiebotapp_Cookiebot_Declaration_DataConfig>;
  disable?: Maybe<Macro_System_Disable_DataConfig>;
  embed?: Maybe<Macro_System_Embed_DataConfig>;
  highlighted_box?: Maybe<Macro_Idebanken_Highlighted_Box_DataConfig>;
  image?: Maybe<Macro_Org_Idebanken_App_Extensions_Image_DataConfig>;
  myvideo?: Maybe<Macro_Org_Idebanken_App_Extensions_Myvideo_DataConfig>;
  quote?: Maybe<Macro_Idebanken_Quote_DataConfig>;
  separator?: Maybe<Macro_Idebanken_Separator_DataConfig>;
  unsafe_html?: Maybe<Macro_Org_Idebanken_App_Unsafe_Html_DataConfig>;
  video?: Maybe<Macro_Idebanken_Video_DataConfig>;
};

/** Macro descriptor data config for application ['idebanken'] and descriptor ['highlighted_box'] */
export type Macro_Idebanken_Highlighted_Box_DataConfig = {
  __typename?: 'Macro_idebanken_highlighted_box_DataConfig';
  body?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<ResolvedMedia>;
  links: Array<ResolvedLinkSelector>;
  linksAbsolute: Array<ResolvedLinkSelector>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Macro descriptor data config for application ['idebanken'] and descriptor ['highlighted_box'] */
export type Macro_Idebanken_Highlighted_Box_DataConfigLinksArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Macro descriptor data config for application ['idebanken'] and descriptor ['highlighted_box'] */
export type Macro_Idebanken_Highlighted_Box_DataConfigLinksAbsoluteArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Macro descriptor data config for application ['idebanken'] and descriptor ['quote'] */
export type Macro_Idebanken_Quote_DataConfig = {
  __typename?: 'Macro_idebanken_quote_DataConfig';
  body?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

/** Macro descriptor data config for application ['idebanken'] and descriptor ['separator'] */
export type Macro_Idebanken_Separator_DataConfig = {
  __typename?: 'Macro_idebanken_separator_DataConfig';
  body?: Maybe<Scalars['String']['output']>;
};

/** Macro descriptor data config for application ['idebanken'] and descriptor ['video'] */
export type Macro_Idebanken_Video_DataConfig = {
  __typename?: 'Macro_idebanken_video_DataConfig';
  body?: Maybe<Scalars['String']['output']>;
  displayType?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  targetContent?: Maybe<Content>;
};

/** Macro descriptor data config for application ['no.seeds.cookiebotapp'] and descriptor ['cookiebot_declaration'] */
export type Macro_No_Seeds_Cookiebotapp_Cookiebot_Declaration_DataConfig = {
  __typename?: 'Macro_no_seeds_cookiebotapp_cookiebot_declaration_DataConfig';
  body?: Maybe<Scalars['String']['output']>;
};

/** Macro descriptor data config for application ['org.idebanken.app.extensions'] and descriptor ['image'] */
export type Macro_Org_Idebanken_App_Extensions_Image_DataConfig = {
  __typename?: 'Macro_org_idebanken_app_extensions_image_DataConfig';
  body?: Maybe<Scalars['String']['output']>;
  imageId?: Maybe<Content>;
};

/** Macro descriptor data config for application ['org.idebanken.app.extensions'] and descriptor ['myvideo'] */
export type Macro_Org_Idebanken_App_Extensions_Myvideo_DataConfig = {
  __typename?: 'Macro_org_idebanken_app_extensions_myvideo_DataConfig';
  body?: Maybe<Scalars['String']['output']>;
};

/** Macro descriptor data config for application ['org.idebanken.app'] and descriptor ['unsafe_html'] */
export type Macro_Org_Idebanken_App_Unsafe_Html_DataConfig = {
  __typename?: 'Macro_org_idebanken_app_unsafe_html_DataConfig';
  body?: Maybe<Scalars['String']['output']>;
  properties?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
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
  org_idebanken_app?: Maybe<Part_Org_Idebanken_App_ComponentDataApplicationConfig>;
  org_idebanken_app_extensions?: Maybe<Part_Org_Idebanken_App_Extensions_ComponentDataApplicationConfig>;
};

/** Part component application config for application ['idebanken'] */
export type Part_Idebanken_ComponentDataApplicationConfig = {
  __typename?: 'Part_idebanken_ComponentDataApplicationConfig';
  accordion?: Maybe<Part_Idebanken_Accordion>;
  article_card_list?: Maybe<Part_Idebanken_Article_Card_List>;
  button?: Maybe<Part_Idebanken_Button>;
  crash_course_intro_buttons?: Maybe<Part_Idebanken_Crash_Course_Intro_Buttons>;
  crash_course_plan?: Maybe<Part_Idebanken_Crash_Course_Plan>;
  crash_course_title?: Maybe<Part_Idebanken_Crash_Course_Title>;
  downloads?: Maybe<Part_Idebanken_Downloads>;
  expansion_card?: Maybe<Part_Idebanken_Expansion_Card>;
  heading?: Maybe<Part_Idebanken_Heading>;
  image?: Maybe<Part_Idebanken_Image>;
  link_card?: Maybe<Part_Idebanken_Link_Card>;
  link_card_list?: Maybe<Part_Idebanken_Link_Card_List>;
  newsletter_signup?: Maybe<Part_Idebanken_Newsletter_Signup>;
  quote?: Maybe<Part_Idebanken_Quote>;
  related_topics?: Maybe<Part_Idebanken_Related_Topics>;
  search_view?: Maybe<Part_Idebanken_Search_View>;
  show_more?: Maybe<Part_Idebanken_Show_More>;
  skyra?: Maybe<Part_Idebanken_Skyra>;
  table_of_contents?: Maybe<Part_Idebanken_Table_Of_Contents>;
  text_editor?: Maybe<Part_Idebanken_Text_Editor>;
  theme_card_list?: Maybe<Part_Idebanken_Theme_Card_List>;
  video?: Maybe<Part_Idebanken_Video>;
  video_reel?: Maybe<Part_Idebanken_Video_Reel>;
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

/** Part component application config for application ['idebanken'] and descriptor ['article-card-list'] */
export type Part_Idebanken_Article_Card_List = {
  __typename?: 'Part_idebanken_article_card_list';
  availableTypeTags: Array<Tag>;
  list: Array<Article_Card>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};


/** Part component application config for application ['idebanken'] and descriptor ['article-card-list'] */
export type Part_Idebanken_Article_Card_ListListArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  typeTagIds?: InputMaybe<Scalars['String']['input']>;
};


/** Part component application config for application ['idebanken'] and descriptor ['article-card-list'] */
export type Part_Idebanken_Article_Card_ListTotalArgs = {
  typeTagIds?: InputMaybe<Scalars['String']['input']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['button'] */
export type Part_Idebanken_Button = {
  __typename?: 'Part_idebanken_button';
  link: ResolvedLinkSelector;
  size?: Maybe<Scalars['String']['output']>;
  variant?: Maybe<Scalars['String']['output']>;
};

/** Ekstern lenke */
export type Part_Idebanken_Button_ExternalLink = {
  __typename?: 'Part_idebanken_button_ExternalLink';
  linkText?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Intern lenke */
export type Part_Idebanken_Button_InternalLink = {
  __typename?: 'Part_idebanken_button_InternalLink';
  contentId?: Maybe<Content>;
  linkText?: Maybe<Scalars['String']['output']>;
};

/** Lenke-type */
export type Part_Idebanken_Button_InternalOrExternalLink = {
  __typename?: 'Part_idebanken_button_InternalOrExternalLink';
  _selected?: Maybe<Part_Idebanken_Button_InternalOrExternalLink_OptionEnum>;
  externalLink?: Maybe<Part_Idebanken_Button_ExternalLink>;
  internalLink?: Maybe<Part_Idebanken_Button_InternalLink>;
};

/** Lenke-type option enum. */
export enum Part_Idebanken_Button_InternalOrExternalLink_OptionEnum {
  ExternalLink = 'externalLink',
  InternalLink = 'internalLink'
}

/** Part component application config for application ['idebanken'] and descriptor ['crash-course-intro-buttons'] */
export type Part_Idebanken_Crash_Course_Intro_Buttons = {
  __typename?: 'Part_idebanken_crash_course_intro_buttons';
  showFullscreenButton?: Maybe<Scalars['Boolean']['output']>;
  showThemeButton?: Maybe<Scalars['Boolean']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['crash-course-plan'] */
export type Part_Idebanken_Crash_Course_Plan = {
  __typename?: 'Part_idebanken_crash_course_plan';
  parts?: Maybe<Array<Maybe<Part_Idebanken_Crash_Course_Plan_Parts>>>;
};


/** Part component application config for application ['idebanken'] and descriptor ['crash-course-plan'] */
export type Part_Idebanken_Crash_Course_PlanPartsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Deler */
export type Part_Idebanken_Crash_Course_Plan_Parts = {
  __typename?: 'Part_idebanken_crash_course_plan_Parts';
  label?: Maybe<Scalars['String']['output']>;
  slides?: Maybe<Array<Maybe<Part_Idebanken_Crash_Course_Plan_Slides>>>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Deler */
export type Part_Idebanken_Crash_Course_Plan_PartsSlidesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Underdeler */
export type Part_Idebanken_Crash_Course_Plan_Slides = {
  __typename?: 'Part_idebanken_crash_course_plan_Slides';
  icon?: Maybe<Content>;
  text?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['crash-course-title'] */
export type Part_Idebanken_Crash_Course_Title = {
  __typename?: 'Part_idebanken_crash_course_title';
  prefix?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['downloads'] */
export type Part_Idebanken_Downloads = {
  __typename?: 'Part_idebanken_downloads';
  ingress?: Maybe<Scalars['String']['output']>;
  selectedFiles?: Maybe<Array<Maybe<Content>>>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Part component application config for application ['idebanken'] and descriptor ['downloads'] */
export type Part_Idebanken_DownloadsSelectedFilesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['expansion-card'] */
export type Part_Idebanken_Expansion_Card = {
  __typename?: 'Part_idebanken_expansion_card';
  brand?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  header?: Maybe<Scalars['String']['output']>;
  simpleTextEditor?: Maybe<RichText>;
};


/** Part component application config for application ['idebanken'] and descriptor ['expansion-card'] */
export type Part_Idebanken_Expansion_CardSimpleTextEditorArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Part component application config for application ['idebanken'] and descriptor ['heading'] */
export type Part_Idebanken_Heading = {
  __typename?: 'Part_idebanken_heading';
  halfWidth?: Maybe<Scalars['Boolean']['output']>;
  headingLede?: Maybe<Scalars['String']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['image'] */
export type Part_Idebanken_Image = {
  __typename?: 'Part_idebanken_image';
  decorative?: Maybe<Scalars['Boolean']['output']>;
  hideOnMobile?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Content>;
  image_size?: Maybe<Part_Idebanken_Image_ImageSize>;
  includeCaption?: Maybe<Scalars['Boolean']['output']>;
  overrideCaption?: Maybe<Scalars['String']['output']>;
};

/** Størrelsesforhold */
export type Part_Idebanken_Image_AspectRatio = {
  __typename?: 'Part_idebanken_image_AspectRatio';
  aspectRatio?: Maybe<Scalars['String']['output']>;
  centerHorizontally?: Maybe<Scalars['Boolean']['output']>;
  centerVertically?: Maybe<Scalars['Boolean']['output']>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  roundedCorners?: Maybe<Scalars['Boolean']['output']>;
};

/** Rundinger */
export type Part_Idebanken_Image_Circles = {
  __typename?: 'Part_idebanken_image_Circles';
  bottom?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  left?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
};

/** Egendefinert størrelse og styling */
export type Part_Idebanken_Image_CustomSize = {
  __typename?: 'Part_idebanken_image_CustomSize';
  border?: Maybe<Scalars['Boolean']['output']>;
  borderDistance?: Maybe<Scalars['String']['output']>;
  borderRadius?: Maybe<Scalars['String']['output']>;
  centerHorizontally?: Maybe<Scalars['Boolean']['output']>;
  centerVertically?: Maybe<Scalars['Boolean']['output']>;
  circles?: Maybe<Array<Maybe<Part_Idebanken_Image_Circles>>>;
  height?: Maybe<Scalars['String']['output']>;
  paddingX?: Maybe<Scalars['String']['output']>;
  paddingY?: Maybe<Scalars['String']['output']>;
  scale?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['String']['output']>;
};


/** Egendefinert størrelse og styling */
export type Part_Idebanken_Image_CustomSizeCirclesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Bildestørrelse */
export type Part_Idebanken_Image_ImageSize = {
  __typename?: 'Part_idebanken_image_ImageSize';
  _selected?: Maybe<Part_Idebanken_Image_ImageSize_OptionEnum>;
  aspect_ratio?: Maybe<Part_Idebanken_Image_AspectRatio>;
  custom_size?: Maybe<Part_Idebanken_Image_CustomSize>;
  standard_size?: Maybe<Part_Idebanken_Image_StandardSize>;
};

/** Bildestørrelse option enum. */
export enum Part_Idebanken_Image_ImageSize_OptionEnum {
  AspectRatio = 'aspect_ratio',
  CustomSize = 'custom_size',
  StandardSize = 'standard_size'
}

/** Standard størrelse */
export type Part_Idebanken_Image_StandardSize = {
  __typename?: 'Part_idebanken_image_StandardSize';
  standardWidth?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['link-card'] */
export type Part_Idebanken_Link_Card = {
  __typename?: 'Part_idebanken_link_card';
  color?: Maybe<Scalars['String']['output']>;
  displayType?: Maybe<Scalars['String']['output']>;
  hideArrow?: Maybe<Scalars['Boolean']['output']>;
  hideTag?: Maybe<Scalars['Boolean']['output']>;
  resolvedLinkCard: Link_Card;
  showDescription?: Maybe<Scalars['Boolean']['output']>;
};

/** Ekstern lenke */
export type Part_Idebanken_Link_Card_ExternalLink = {
  __typename?: 'Part_idebanken_link_card_ExternalLink';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Content>;
  image?: Maybe<Content>;
  linkText?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Intern lenke */
export type Part_Idebanken_Link_Card_InternalLink = {
  __typename?: 'Part_idebanken_link_card_InternalLink';
  contentId?: Maybe<Content>;
  linkText?: Maybe<Scalars['String']['output']>;
};

/** Lenke-type */
export type Part_Idebanken_Link_Card_InternalOrExternalLink = {
  __typename?: 'Part_idebanken_link_card_InternalOrExternalLink';
  _selected?: Maybe<Part_Idebanken_Link_Card_InternalOrExternalLink_OptionEnum>;
  externalLink?: Maybe<Part_Idebanken_Link_Card_ExternalLink>;
  internalLink?: Maybe<Part_Idebanken_Link_Card_InternalLink>;
};

/** Lenke-type option enum. */
export enum Part_Idebanken_Link_Card_InternalOrExternalLink_OptionEnum {
  ExternalLink = 'externalLink',
  InternalLink = 'internalLink'
}

/** Part component application config for application ['idebanken'] and descriptor ['link-card-list'] */
export type Part_Idebanken_Link_Card_List = {
  __typename?: 'Part_idebanken_link_card_list';
  color?: Maybe<Scalars['String']['output']>;
  displayType?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Part_Idebanken_Link_Card_List_Heading>;
  hideArrow?: Maybe<Scalars['Boolean']['output']>;
  hideTag?: Maybe<Scalars['Boolean']['output']>;
  list: Array<Link_Card>;
  nEachRow?: Maybe<Scalars['String']['output']>;
  showDescription?: Maybe<Scalars['Boolean']['output']>;
};

/** Automatisk liste */
export type Part_Idebanken_Link_Card_List_Automatic = {
  __typename?: 'Part_idebanken_link_card_list_Automatic';
  contentTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  limit?: Maybe<Scalars['String']['output']>;
  parentContent?: Maybe<Content>;
  showHeading?: Maybe<Scalars['Boolean']['output']>;
};


/** Automatisk liste */
export type Part_Idebanken_Link_Card_List_AutomaticContentTypesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Liste-type */
export type Part_Idebanken_Link_Card_List_List = {
  __typename?: 'Part_idebanken_link_card_list_List';
  _selected?: Maybe<Part_Idebanken_Link_Card_List_List_OptionEnum>;
  automatic?: Maybe<Part_Idebanken_Link_Card_List_Automatic>;
  manual?: Maybe<Part_Idebanken_Link_Card_List_Manual>;
};

/** Liste-type option enum. */
export enum Part_Idebanken_Link_Card_List_List_OptionEnum {
  Automatic = 'automatic',
  Manual = 'manual'
}

/** Manuell liste */
export type Part_Idebanken_Link_Card_List_Manual = {
  __typename?: 'Part_idebanken_link_card_list_Manual';
  contents?: Maybe<Array<Maybe<Content>>>;
};


/** Manuell liste */
export type Part_Idebanken_Link_Card_List_ManualContentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Automatic heading for link card list */
export type Part_Idebanken_Link_Card_List_Heading = {
  __typename?: 'Part_idebanken_link_card_list_heading';
  href: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** Part component application config for application ['idebanken'] and descriptor ['newsletter-signup'] */
export type Part_Idebanken_Newsletter_Signup = {
  __typename?: 'Part_idebanken_newsletter_signup';
  description?: Maybe<Scalars['String']['output']>;
  redirectContent?: Maybe<Content>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['quote'] */
export type Part_Idebanken_Quote = {
  __typename?: 'Part_idebanken_quote';
  body?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['related-topics'] */
export type Part_Idebanken_Related_Topics = {
  __typename?: 'Part_idebanken_related_topics';
  title?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['search-view'] */
export type Part_Idebanken_Search_View = {
  __typename?: 'Part_idebanken_search_view';
  text?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['show-more'] */
export type Part_Idebanken_Show_More = {
  __typename?: 'Part_idebanken_show_more';
  simpleTextEditor?: Maybe<RichText>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Part component application config for application ['idebanken'] and descriptor ['show-more'] */
export type Part_Idebanken_Show_MoreSimpleTextEditorArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Part component application config for application ['idebanken'] and descriptor ['skyra'] */
export type Part_Idebanken_Skyra = {
  __typename?: 'Part_idebanken_skyra';
  slug?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['table-of-contents'] */
export type Part_Idebanken_Table_Of_Contents = {
  __typename?: 'Part_idebanken_table_of_contents';
  sections?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sticky?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Part component application config for application ['idebanken'] and descriptor ['table-of-contents'] */
export type Part_Idebanken_Table_Of_ContentsSectionsArgs = {
  path: Scalars['ID']['input'];
};

/** Part component application config for application ['idebanken'] and descriptor ['text-editor'] */
export type Part_Idebanken_Text_Editor = {
  __typename?: 'Part_idebanken_text_editor';
  bleed?: Maybe<Scalars['Boolean']['output']>;
  boxColor?: Maybe<Scalars['String']['output']>;
  halfWidth?: Maybe<Scalars['Boolean']['output']>;
  simpleTextEditor?: Maybe<RichText>;
};


/** Part component application config for application ['idebanken'] and descriptor ['text-editor'] */
export type Part_Idebanken_Text_EditorSimpleTextEditorArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Part component application config for application ['idebanken'] and descriptor ['theme-card-list'] */
export type Part_Idebanken_Theme_Card_List = {
  __typename?: 'Part_idebanken_theme_card_list';
  data: Theme_Card_List_Data;
  displayType?: Maybe<Scalars['String']['output']>;
  highlightedContent?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  pageSize?: Maybe<Scalars['Int']['output']>;
};


/** Part component application config for application ['idebanken'] and descriptor ['theme-card-list'] */
export type Part_Idebanken_Theme_Card_ListDataArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  path: Scalars['ID']['input'];
};


/** Part component application config for application ['idebanken'] and descriptor ['theme-card-list'] */
export type Part_Idebanken_Theme_Card_ListHighlightedContentArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Part component application config for application ['idebanken'] and descriptor ['video'] */
export type Part_Idebanken_Video = {
  __typename?: 'Part_idebanken_video';
  displayType?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  targetContent?: Maybe<Content>;
};

/** Part component application config for application ['idebanken'] and descriptor ['video-reel'] */
export type Part_Idebanken_Video_Reel = {
  __typename?: 'Part_idebanken_video_reel';
  videos?: Maybe<Array<Maybe<Part_Idebanken_Video_Reel_Videos>>>;
};


/** Part component application config for application ['idebanken'] and descriptor ['video-reel'] */
export type Part_Idebanken_Video_ReelVideosArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Videoer */
export type Part_Idebanken_Video_Reel_Videos = {
  __typename?: 'Part_idebanken_video_reel_Videos';
  language?: Maybe<Scalars['String']['output']>;
  targetContent?: Maybe<Content>;
};

/** Part component application config for application ['org.idebanken.app'] */
export type Part_Org_Idebanken_App_ComponentDataApplicationConfig = {
  __typename?: 'Part_org_idebanken_app_ComponentDataApplicationConfig';
  newsletter_subscription?: Maybe<Part_Org_Idebanken_App_Newsletter_Subscription>;
  xp_address_list?: Maybe<Part_Org_Idebanken_App_Xp_Address_List>;
  xp_article_list?: Maybe<Part_Org_Idebanken_App_Xp_Article_List>;
  xp_article_list_frontpage?: Maybe<Part_Org_Idebanken_App_Xp_Article_List_Frontpage>;
  xp_comicstrip_gallery?: Maybe<Part_Org_Idebanken_App_Xp_Comicstrip_Gallery>;
  xp_contact_person_list?: Maybe<Part_Org_Idebanken_App_Xp_Contact_Person_List>;
  xp_error?: Maybe<Part_Org_Idebanken_App_Xp_Error>;
  xp_news_circles?: Maybe<Part_Org_Idebanken_App_Xp_News_Circles>;
  xp_newsletter_show?: Maybe<Part_Org_Idebanken_App_Xp_Newsletter_Show>;
  xp_resource_displayname_description?: Maybe<Part_Org_Idebanken_App_Xp_Resource_Displayname_Description>;
};

/** Part component application config for application ['org.idebanken.app.extensions'] */
export type Part_Org_Idebanken_App_Extensions_ComponentDataApplicationConfig = {
  __typename?: 'Part_org_idebanken_app_extensions_ComponentDataApplicationConfig';
  accordion?: Maybe<Part_Org_Idebanken_App_Extensions_Accordion>;
  boks_fakta?: Maybe<Part_Org_Idebanken_App_Extensions_Boks_Fakta>;
  button_grid?: Maybe<Part_Org_Idebanken_App_Extensions_Button_Grid>;
  full_width?: Maybe<Part_Org_Idebanken_App_Extensions_Full_Width>;
  intro?: Maybe<Part_Org_Idebanken_App_Extensions_Intro>;
  related_subject?: Maybe<Part_Org_Idebanken_App_Extensions_Related_Subject>;
  show_pamphlet?: Maybe<Part_Org_Idebanken_App_Extensions_Show_Pamphlet>;
};

/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['accordion'] */
export type Part_Org_Idebanken_App_Extensions_Accordion = {
  __typename?: 'Part_org_idebanken_app_extensions_accordion';
  bgColor?: Maybe<Scalars['String']['output']>;
  bundle?: Maybe<Array<Maybe<Part_Org_Idebanken_App_Extensions_Accordion_Bundle>>>;
  headline?: Maybe<Scalars['String']['output']>;
  headlineColor?: Maybe<Scalars['String']['output']>;
  headlineSize?: Maybe<Scalars['String']['output']>;
};


/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['accordion'] */
export type Part_Org_Idebanken_App_Extensions_AccordionBundleArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** gruppe */
export type Part_Org_Idebanken_App_Extensions_Accordion_Bundle = {
  __typename?: 'Part_org_idebanken_app_extensions_accordion_Bundle';
  group_headline?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Array<Maybe<Part_Org_Idebanken_App_Extensions_Accordion_Rows>>>;
};


/** gruppe */
export type Part_Org_Idebanken_App_Extensions_Accordion_BundleRowsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** rad */
export type Part_Org_Idebanken_App_Extensions_Accordion_Rows = {
  __typename?: 'Part_org_idebanken_app_extensions_accordion_Rows';
  row_headline?: Maybe<Scalars['String']['output']>;
  row_headline_color?: Maybe<Scalars['String']['output']>;
  row_headline_size?: Maybe<Scalars['String']['output']>;
  row_text?: Maybe<RichText>;
};


/** rad */
export type Part_Org_Idebanken_App_Extensions_Accordion_RowsRow_TextArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['boks-fakta'] */
export type Part_Org_Idebanken_App_Extensions_Boks_Fakta = {
  __typename?: 'Part_org_idebanken_app_extensions_boks_fakta';
  bg_type?: Maybe<Part_Org_Idebanken_App_Extensions_Boks_Fakta_BgType>;
  color_overlay?: Maybe<Part_Org_Idebanken_App_Extensions_Boks_Fakta_ColorOverlay>;
  lightMode?: Maybe<Scalars['Boolean']['output']>;
  newTekst?: Maybe<Array<Maybe<RichText>>>;
  sizing?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['boks-fakta'] */
export type Part_Org_Idebanken_App_Extensions_Boks_FaktaNewTekstArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Hvilken type bakgrunn skal du ha? */
export type Part_Org_Idebanken_App_Extensions_Boks_Fakta_BgType = {
  __typename?: 'Part_org_idebanken_app_extensions_boks_fakta_BgType';
  _selected?: Maybe<Part_Org_Idebanken_App_Extensions_Boks_Fakta_BgType_OptionEnum>;
  image?: Maybe<Part_Org_Idebanken_App_Extensions_Boks_Fakta_Image>;
  nothing?: Maybe<Scalars['String']['output']>;
};

/** Hvilken type bakgrunn skal du ha? option enum. */
export enum Part_Org_Idebanken_App_Extensions_Boks_Fakta_BgType_OptionEnum {
  Image = 'image',
  Nothing = 'nothing'
}

/** Legg en farge over bakgrunnen? */
export type Part_Org_Idebanken_App_Extensions_Boks_Fakta_ColorOverlay = {
  __typename?: 'Part_org_idebanken_app_extensions_boks_fakta_ColorOverlay';
  _selected?: Maybe<Part_Org_Idebanken_App_Extensions_Boks_Fakta_ColorOverlay_OptionEnum>;
  tint?: Maybe<Part_Org_Idebanken_App_Extensions_Boks_Fakta_Tint>;
};

/** Legg en farge over bakgrunnen? option enum. */
export enum Part_Org_Idebanken_App_Extensions_Boks_Fakta_ColorOverlay_OptionEnum {
  Tint = 'tint'
}

/** Bilde */
export type Part_Org_Idebanken_App_Extensions_Boks_Fakta_Image = {
  __typename?: 'Part_org_idebanken_app_extensions_boks_fakta_Image';
  fixed?: Maybe<Scalars['Boolean']['output']>;
  selected_image?: Maybe<Content>;
};

/** Ja - legg på farge */
export type Part_Org_Idebanken_App_Extensions_Boks_Fakta_Tint = {
  __typename?: 'Part_org_idebanken_app_extensions_boks_fakta_Tint';
  bg_color?: Maybe<Scalars['String']['output']>;
  opacity?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['button-grid'] */
export type Part_Org_Idebanken_App_Extensions_Button_Grid = {
  __typename?: 'Part_org_idebanken_app_extensions_button_grid';
  bgColor?: Maybe<Scalars['String']['output']>;
  buttons?: Maybe<Array<Maybe<Part_Org_Idebanken_App_Extensions_Button_Grid_Buttons>>>;
  headline?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['String']['output']>;
};


/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['button-grid'] */
export type Part_Org_Idebanken_App_Extensions_Button_GridButtonsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Part_Org_Idebanken_App_Extensions_Button_Grid_Action = {
  __typename?: 'Part_org_idebanken_app_extensions_button_grid_Action';
  _selected?: Maybe<Part_Org_Idebanken_App_Extensions_Button_Grid_Action_OptionEnum>;
  content?: Maybe<Part_Org_Idebanken_App_Extensions_Button_Grid_Content>;
  external?: Maybe<Part_Org_Idebanken_App_Extensions_Button_Grid_External>;
};

/**  option enum. */
export enum Part_Org_Idebanken_App_Extensions_Button_Grid_Action_OptionEnum {
  Content = 'content',
  External = 'external'
}

/** Knapp */
export type Part_Org_Idebanken_App_Extensions_Button_Grid_Buttons = {
  __typename?: 'Part_org_idebanken_app_extensions_button_grid_Buttons';
  action?: Maybe<Part_Org_Idebanken_App_Extensions_Button_Grid_Action>;
  color?: Maybe<Scalars['String']['output']>;
  strokeColor?: Maybe<Scalars['String']['output']>;
  strokeSize?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  textBold?: Maybe<Scalars['Boolean']['output']>;
  textColor?: Maybe<Scalars['String']['output']>;
  textSize?: Maybe<Scalars['String']['output']>;
};

/** Inntern lenke */
export type Part_Org_Idebanken_App_Extensions_Button_Grid_Content = {
  __typename?: 'Part_org_idebanken_app_extensions_button_grid_Content';
  linkId?: Maybe<Content>;
};

/** Ekstern lenke */
export type Part_Org_Idebanken_App_Extensions_Button_Grid_External = {
  __typename?: 'Part_org_idebanken_app_extensions_button_grid_External';
  url?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['full-width'] */
export type Part_Org_Idebanken_App_Extensions_Full_Width = {
  __typename?: 'Part_org_idebanken_app_extensions_full_width';
  bg_type?: Maybe<Part_Org_Idebanken_App_Extensions_Full_Width_BgType>;
};

/** Type bakgrunn */
export type Part_Org_Idebanken_App_Extensions_Full_Width_BgType = {
  __typename?: 'Part_org_idebanken_app_extensions_full_width_BgType';
  _selected?: Maybe<Part_Org_Idebanken_App_Extensions_Full_Width_BgType_OptionEnum>;
  image?: Maybe<Part_Org_Idebanken_App_Extensions_Full_Width_Image>;
  video?: Maybe<Part_Org_Idebanken_App_Extensions_Full_Width_Video>;
};

/** Type bakgrunn option enum. */
export enum Part_Org_Idebanken_App_Extensions_Full_Width_BgType_OptionEnum {
  Image = 'image',
  Video = 'video'
}

/** Bilde */
export type Part_Org_Idebanken_App_Extensions_Full_Width_Image = {
  __typename?: 'Part_org_idebanken_app_extensions_full_width_Image';
  description?: Maybe<Scalars['String']['output']>;
  fixed?: Maybe<Scalars['Boolean']['output']>;
  selected_image?: Maybe<Content>;
};

/** Video */
export type Part_Org_Idebanken_App_Extensions_Full_Width_Video = {
  __typename?: 'Part_org_idebanken_app_extensions_full_width_Video';
  autoplay?: Maybe<Scalars['Boolean']['output']>;
  controls?: Maybe<Scalars['Boolean']['output']>;
  embed?: Maybe<Scalars['String']['output']>;
  muted?: Maybe<Scalars['Boolean']['output']>;
  selected_video?: Maybe<Content>;
};

/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['intro'] */
export type Part_Org_Idebanken_App_Extensions_Intro = {
  __typename?: 'Part_org_idebanken_app_extensions_intro';
  author?: Maybe<Scalars['String']['output']>;
  bg_type?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_BgType>;
  color_overlay?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_ColorOverlay>;
  coverHeight?: Maybe<Scalars['String']['output']>;
  hidePublish?: Maybe<Scalars['Boolean']['output']>;
  options?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_Options>;
  sub_headline?: Maybe<Scalars['String']['output']>;
};

/** Hvilken type bakgrunn skal du ha? */
export type Part_Org_Idebanken_App_Extensions_Intro_BgType = {
  __typename?: 'Part_org_idebanken_app_extensions_intro_BgType';
  _selected?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_BgType_OptionEnum>;
  image?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_Image>;
  nothing?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_Video>;
};

/** Hvilken type bakgrunn skal du ha? option enum. */
export enum Part_Org_Idebanken_App_Extensions_Intro_BgType_OptionEnum {
  Image = 'image',
  Nothing = 'nothing',
  Video = 'video'
}

/** Legg en farge over bakgrunnen? */
export type Part_Org_Idebanken_App_Extensions_Intro_ColorOverlay = {
  __typename?: 'Part_org_idebanken_app_extensions_intro_ColorOverlay';
  _selected?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_ColorOverlay_OptionEnum>;
  tint?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_Tint>;
};

/** Legg en farge over bakgrunnen? option enum. */
export enum Part_Org_Idebanken_App_Extensions_Intro_ColorOverlay_OptionEnum {
  Tint = 'tint'
}

/** Legg på mørk gradient? */
export type Part_Org_Idebanken_App_Extensions_Intro_Gradient = {
  __typename?: 'Part_org_idebanken_app_extensions_intro_Gradient';
  type?: Maybe<Scalars['String']['output']>;
};

/** Bilde */
export type Part_Org_Idebanken_App_Extensions_Intro_Image = {
  __typename?: 'Part_org_idebanken_app_extensions_intro_Image';
  fixed?: Maybe<Scalars['Boolean']['output']>;
  selected_image?: Maybe<Content>;
};

/** Kryss av for det du trenger: */
export type Part_Org_Idebanken_App_Extensions_Intro_Options = {
  __typename?: 'Part_org_idebanken_app_extensions_intro_Options';
  _selected?: Maybe<Array<Maybe<Part_Org_Idebanken_App_Extensions_Intro_Options_OptionEnum>>>;
  gradient?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_Gradient>;
  overwrite?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_Overwrite>;
  text_styling?: Maybe<Part_Org_Idebanken_App_Extensions_Intro_TextStyling>;
};

/** Kryss av for det du trenger: option enum. */
export enum Part_Org_Idebanken_App_Extensions_Intro_Options_OptionEnum {
  Gradient = 'gradient',
  Overwrite = 'overwrite',
  TextStyling = 'text_styling'
}

/** Overskriv title/ingress? */
export type Part_Org_Idebanken_App_Extensions_Intro_Overwrite = {
  __typename?: 'Part_org_idebanken_app_extensions_intro_Overwrite';
  headline?: Maybe<Scalars['String']['output']>;
  preface?: Maybe<Scalars['String']['output']>;
};

/** Endre på tekst-farger? */
export type Part_Org_Idebanken_App_Extensions_Intro_TextStyling = {
  __typename?: 'Part_org_idebanken_app_extensions_intro_TextStyling';
  color_text_for?: Maybe<Scalars['String']['output']>;
};

/** Ja - legg på farge */
export type Part_Org_Idebanken_App_Extensions_Intro_Tint = {
  __typename?: 'Part_org_idebanken_app_extensions_intro_Tint';
  bg_color?: Maybe<Scalars['String']['output']>;
  opacity?: Maybe<Scalars['String']['output']>;
};

/** Video */
export type Part_Org_Idebanken_App_Extensions_Intro_Video = {
  __typename?: 'Part_org_idebanken_app_extensions_intro_Video';
  selected_video?: Maybe<Content>;
};

/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['related-subject'] */
export type Part_Org_Idebanken_App_Extensions_Related_Subject = {
  __typename?: 'Part_org_idebanken_app_extensions_related_subject';
  bg_color?: Maybe<Scalars['String']['output']>;
  boxConfiguration?: Maybe<Part_Org_Idebanken_App_Extensions_Related_Subject_BoxConfiguration>;
  lightHeadline?: Maybe<Scalars['Boolean']['output']>;
  opacity?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Part_Org_Idebanken_App_Extensions_Related_Subject_Action = {
  __typename?: 'Part_org_idebanken_app_extensions_related_subject_Action';
  _selected?: Maybe<Part_Org_Idebanken_App_Extensions_Related_Subject_Action_OptionEnum>;
  content?: Maybe<Part_Org_Idebanken_App_Extensions_Related_Subject_Content>;
  external?: Maybe<Part_Org_Idebanken_App_Extensions_Related_Subject_External>;
};

/**  option enum. */
export enum Part_Org_Idebanken_App_Extensions_Related_Subject_Action_OptionEnum {
  Content = 'content',
  External = 'external'
}

/** Automatisk henter inn artikkler */
export type Part_Org_Idebanken_App_Extensions_Related_Subject_Automatic = {
  __typename?: 'Part_org_idebanken_app_extensions_related_subject_Automatic';
  amount?: Maybe<Scalars['String']['output']>;
  boxBackgroundColor?: Maybe<Scalars['String']['output']>;
  item?: Maybe<Content>;
  lightMode?: Maybe<Scalars['Boolean']['output']>;
};

/** Hvordan lenke til andre elementer? */
export type Part_Org_Idebanken_App_Extensions_Related_Subject_BoxConfiguration = {
  __typename?: 'Part_org_idebanken_app_extensions_related_subject_BoxConfiguration';
  _selected?: Maybe<Part_Org_Idebanken_App_Extensions_Related_Subject_BoxConfiguration_OptionEnum>;
  automatic?: Maybe<Part_Org_Idebanken_App_Extensions_Related_Subject_Automatic>;
  manual?: Maybe<Part_Org_Idebanken_App_Extensions_Related_Subject_Manual>;
};

/** Hvordan lenke til andre elementer? option enum. */
export enum Part_Org_Idebanken_App_Extensions_Related_Subject_BoxConfiguration_OptionEnum {
  Automatic = 'automatic',
  Manual = 'manual'
}

/** Inntern lenke */
export type Part_Org_Idebanken_App_Extensions_Related_Subject_Content = {
  __typename?: 'Part_org_idebanken_app_extensions_related_subject_Content';
  linkId?: Maybe<Content>;
};

/** Ekstern lenke */
export type Part_Org_Idebanken_App_Extensions_Related_Subject_External = {
  __typename?: 'Part_org_idebanken_app_extensions_related_subject_External';
  url?: Maybe<Scalars['String']['output']>;
};

/** Manuelt velg hva som skal vises */
export type Part_Org_Idebanken_App_Extensions_Related_Subject_Manual = {
  __typename?: 'Part_org_idebanken_app_extensions_related_subject_Manual';
  options?: Maybe<Array<Maybe<Part_Org_Idebanken_App_Extensions_Related_Subject_Options>>>;
};


/** Manuelt velg hva som skal vises */
export type Part_Org_Idebanken_App_Extensions_Related_Subject_ManualOptionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** new box */
export type Part_Org_Idebanken_App_Extensions_Related_Subject_Options = {
  __typename?: 'Part_org_idebanken_app_extensions_related_subject_Options';
  action?: Maybe<Part_Org_Idebanken_App_Extensions_Related_Subject_Action>;
  bg_color?: Maybe<Scalars['String']['output']>;
  header?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Content>;
  lightMode?: Maybe<Scalars['Boolean']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['show-pamphlet'] */
export type Part_Org_Idebanken_App_Extensions_Show_Pamphlet = {
  __typename?: 'Part_org_idebanken_app_extensions_show_pamphlet';
  bg_color?: Maybe<Scalars['String']['output']>;
  documents?: Maybe<Array<Maybe<Content>>>;
  lightMode?: Maybe<Scalars['Boolean']['output']>;
};


/** Part component application config for application ['org.idebanken.app.extensions'] and descriptor ['show-pamphlet'] */
export type Part_Org_Idebanken_App_Extensions_Show_PamphletDocumentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Part component application config for application ['org.idebanken.app'] and descriptor ['newsletter-subscription'] */
export type Part_Org_Idebanken_App_Newsletter_Subscription = {
  __typename?: 'Part_org_idebanken_app_newsletter_subscription';
  campaignId?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-address-list'] */
export type Part_Org_Idebanken_App_Xp_Address_List = {
  __typename?: 'Part_org_idebanken_app_xp_address_list';
  office?: Maybe<Array<Maybe<Content>>>;
};


/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-address-list'] */
export type Part_Org_Idebanken_App_Xp_Address_ListOfficeArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-article-list'] */
export type Part_Org_Idebanken_App_Xp_Article_List = {
  __typename?: 'Part_org_idebanken_app_xp_article_list';
  category?: Maybe<Scalars['String']['output']>;
  startAmount?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-article-list-frontpage'] */
export type Part_Org_Idebanken_App_Xp_Article_List_Frontpage = {
  __typename?: 'Part_org_idebanken_app_xp_article_list_frontpage';
  Kampanjebokser?: Maybe<Array<Maybe<Part_Org_Idebanken_App_Xp_Article_List_Frontpage_Kampanjebokser>>>;
  numArticles?: Maybe<Scalars['String']['output']>;
};


/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-article-list-frontpage'] */
export type Part_Org_Idebanken_App_Xp_Article_List_FrontpageKampanjebokserArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Kampanjebokser */
export type Part_Org_Idebanken_App_Xp_Article_List_Frontpage_Kampanjebokser = {
  __typename?: 'Part_org_idebanken_app_xp_article_list_frontpage_Kampanjebokser';
  index?: Maybe<Scalars['String']['output']>;
  kampanje?: Maybe<Content>;
};

/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-comicstrip-gallery'] */
export type Part_Org_Idebanken_App_Xp_Comicstrip_Gallery = {
  __typename?: 'Part_org_idebanken_app_xp_comicstrip_gallery';
  comics?: Maybe<Content>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-contact-person-list'] */
export type Part_Org_Idebanken_App_Xp_Contact_Person_List = {
  __typename?: 'Part_org_idebanken_app_xp_contact_person_list';
  contactPerson?: Maybe<Array<Maybe<Content>>>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-contact-person-list'] */
export type Part_Org_Idebanken_App_Xp_Contact_Person_ListContactPersonArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-error'] */
export type Part_Org_Idebanken_App_Xp_Error = {
  __typename?: 'Part_org_idebanken_app_xp_error';
  header?: Maybe<Scalars['String']['output']>;
  header2?: Maybe<Scalars['String']['output']>;
  intro?: Maybe<RichText>;
};


/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-error'] */
export type Part_Org_Idebanken_App_Xp_ErrorIntroArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-news-circles'] */
export type Part_Org_Idebanken_App_Xp_News_Circles = {
  __typename?: 'Part_org_idebanken_app_xp_news_circles';
  news?: Maybe<Array<Maybe<Part_Org_Idebanken_App_Xp_News_Circles_News>>>;
};


/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-news-circles'] */
export type Part_Org_Idebanken_App_Xp_News_CirclesNewsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Circle news */
export type Part_Org_Idebanken_App_Xp_News_Circles_News = {
  __typename?: 'Part_org_idebanken_app_xp_news_circles_News';
  category?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Content>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Content>;
};

/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-newsletter-show'] */
export type Part_Org_Idebanken_App_Xp_Newsletter_Show = {
  __typename?: 'Part_org_idebanken_app_xp_newsletter_show';
  articles?: Maybe<Array<Maybe<Content>>>;
  externals?: Maybe<Array<Maybe<Content>>>;
  externalsHeading?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  numFullwidthArticles?: Maybe<Scalars['String']['output']>;
  subscribeButtonText?: Maybe<Scalars['String']['output']>;
};


/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-newsletter-show'] */
export type Part_Org_Idebanken_App_Xp_Newsletter_ShowArticlesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-newsletter-show'] */
export type Part_Org_Idebanken_App_Xp_Newsletter_ShowExternalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Part component application config for application ['org.idebanken.app'] and descriptor ['xp-resource-displayname-description'] */
export type Part_Org_Idebanken_App_Xp_Resource_Displayname_Description = {
  __typename?: 'Part_org_idebanken_app_xp_resource_displayname_description';
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
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

/** Overridable link */
export type ResolvedLinkSelector = {
  __typename?: 'ResolvedLinkSelector';
  download?: Maybe<Scalars['Boolean']['output']>;
  external: Scalars['Boolean']['output'];
  linkText: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

/** Resolved image or vector */
export type ResolvedMedia = {
  __typename?: 'ResolvedMedia';
  altText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
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

/** RobotsTxt rule type */
export type RobotsRule = {
  __typename?: 'RobotsRule';
  allow?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  disallow?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  userAgent?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** RobotsTxt type */
export type RobotsTxt = {
  __typename?: 'RobotsTxt';
  cachecontrol?: Maybe<Scalars['String']['output']>;
  rules?: Maybe<Array<Maybe<RobotsRule>>>;
  sitemap?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  text?: Maybe<Scalars['String']['output']>;
};

/** A simple link with text and href */
export type SimpleLink = {
  __typename?: 'SimpleLink';
  href: Scalars['String']['output'];
  text?: Maybe<Scalars['String']['output']>;
};

/** Configuration for other parts of the site */
export type SiteConfiguration = {
  __typename?: 'SiteConfiguration';
  alertBanner?: Maybe<AlertBanner>;
  cookieInfoText: Scalars['String']['output'];
  searchPageHref: Scalars['String']['output'];
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

/** Resolved tag */
export type Tag = {
  __typename?: 'Tag';
  color?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
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

/** Theme card */
export type Theme_Card = {
  __typename?: 'Theme_card';
  description?: Maybe<Scalars['String']['output']>;
  external: Scalars['Boolean']['output'];
  image?: Maybe<ResolvedMedia>;
  themeTags: Array<Tag>;
  title: Scalars['String']['output'];
  typeTags: Array<Tag>;
  url: Scalars['String']['output'];
};

/** Theme card list data */
export type Theme_Card_List_Data = {
  __typename?: 'Theme_card_list_data';
  list: Array<Theme_Card>;
  total: Scalars['Int']['output'];
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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

/** XDataApplicationConfig for application ['idebanken'] */
export type XData_Idebanken_ApplicationConfig = {
  __typename?: 'XData_idebanken_ApplicationConfig';
  aktuelt_tags?: Maybe<XData_Idebanken_Aktuelt_Tags_DataConfig>;
  meta?: Maybe<XData_Idebanken_Meta_DataConfig>;
  tags?: Maybe<XData_Idebanken_Tags_DataConfig>;
};

/** Extra data config for application ['idebanken}'] and descriptor ['aktuelt-tags'] */
export type XData_Idebanken_Aktuelt_Tags_DataConfig = {
  __typename?: 'XData_idebanken_aktuelt_tags_DataConfig';
  themeTags: Array<Tag>;
  typeTags: Array<Tag>;
};


/** Extra data config for application ['idebanken}'] and descriptor ['aktuelt-tags'] */
export type XData_Idebanken_Aktuelt_Tags_DataConfigThemeTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Extra data config for application ['idebanken}'] and descriptor ['meta'] */
export type XData_Idebanken_Meta_DataConfig = {
  __typename?: 'XData_idebanken_meta_DataConfig';
  hideFromInternalSearch?: Maybe<Scalars['Boolean']['output']>;
  hideFromListViews?: Maybe<Scalars['Boolean']['output']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** Extra data config for application ['idebanken}'] and descriptor ['meta'] */
export type XData_Idebanken_Meta_DataConfigKeywordsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Extra data config for application ['idebanken}'] and descriptor ['tags'] */
export type XData_Idebanken_Tags_DataConfig = {
  __typename?: 'XData_idebanken_tags_DataConfig';
  themeTags: Array<Tag>;
  typeTags: Array<Tag>;
};


/** Extra data config for application ['idebanken}'] and descriptor ['tags'] */
export type XData_Idebanken_Tags_DataConfigThemeTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

/** XDataApplicationConfig for application ['org.idebanken.app'] */
export type XData_Org_Idebanken_App_ApplicationConfig = {
  __typename?: 'XData_org_idebanken_app_ApplicationConfig';
  menu_item?: Maybe<XData_Org_Idebanken_App_Menu_Item_DataConfig>;
  publishDate?: Maybe<XData_Org_Idebanken_App_PublishDate_DataConfig>;
};

/** Extra data config for application ['org.idebanken.app}'] and descriptor ['menu-item'] */
export type XData_Org_Idebanken_App_Menu_Item_DataConfig = {
  __typename?: 'XData_org_idebanken_app_menu_item_DataConfig';
  menuItem?: Maybe<Scalars['Boolean']['output']>;
  menuName?: Maybe<Scalars['String']['output']>;
};

/** Extra data config for application ['org.idebanken.app}'] and descriptor ['publishDate'] */
export type XData_Org_Idebanken_App_PublishDate_DataConfig = {
  __typename?: 'XData_org_idebanken_app_publishDate_DataConfig';
  publishFrom?: Maybe<Scalars['DateTime']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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

/** RSS feed - com.enonic.app.rss:rss-page */
export type Com_Enonic_App_Rss_RssPage = Content & {
  __typename?: 'com_enonic_app_rss_RssPage';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Com_Enonic_App_Rss_RssPage_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** RSS feed - com.enonic.app.rss:rss-page */
export type Com_Enonic_App_Rss_RssPage_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** RSS feed - com.enonic.app.rss:rss-page */
export type Com_Enonic_App_Rss_RssPageChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** RSS feed - com.enonic.app.rss:rss-page */
export type Com_Enonic_App_Rss_RssPageChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** RSS feed - com.enonic.app.rss:rss-page */
export type Com_Enonic_App_Rss_RssPageComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** RSS feed - com.enonic.app.rss:rss-page */
export type Com_Enonic_App_Rss_RssPagePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** RSS feed - com.enonic.app.rss:rss-page */
export type Com_Enonic_App_Rss_RssPagePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** RSS feed - com.enonic.app.rss:rss-page data */
export type Com_Enonic_App_Rss_RssPage_Data = {
  __typename?: 'com_enonic_app_rss_RssPage_Data';
  contenttype?: Maybe<Scalars['String']['output']>;
  counter?: Maybe<Scalars['String']['output']>;
  exclude?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  include?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  language?: Maybe<Scalars['String']['output']>;
  mapAuthor?: Maybe<Scalars['String']['output']>;
  mapBody?: Maybe<Scalars['String']['output']>;
  mapCategories?: Maybe<Scalars['String']['output']>;
  mapDate?: Maybe<Scalars['String']['output']>;
  mapSummary?: Maybe<Scalars['String']['output']>;
  mapThumbnail?: Maybe<Scalars['String']['output']>;
  mapTitle?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  updateFrequency?: Maybe<Scalars['String']['output']>;
  updatePeriod?: Maybe<Scalars['String']['output']>;
};


/** RSS feed - com.enonic.app.rss:rss-page data */
export type Com_Enonic_App_Rss_RssPage_DataExcludeArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** RSS feed - com.enonic.app.rss:rss-page data */
export type Com_Enonic_App_Rss_RssPage_DataIncludeArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Type - idebanken:aktuelt-type-tag */
export type Idebanken_AktueltTypeTag = Content & {
  __typename?: 'idebanken_AktueltTypeTag';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_AktueltTypeTag_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Type - idebanken:aktuelt-type-tag */
export type Idebanken_AktueltTypeTag_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Type - idebanken:aktuelt-type-tag */
export type Idebanken_AktueltTypeTagChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Type - idebanken:aktuelt-type-tag */
export type Idebanken_AktueltTypeTagChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Type - idebanken:aktuelt-type-tag */
export type Idebanken_AktueltTypeTagComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Type - idebanken:aktuelt-type-tag */
export type Idebanken_AktueltTypeTagPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Type - idebanken:aktuelt-type-tag */
export type Idebanken_AktueltTypeTagPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Type - idebanken:aktuelt-type-tag data */
export type Idebanken_AktueltTypeTag_Data = {
  __typename?: 'idebanken_AktueltTypeTag_Data';
  color?: Maybe<Scalars['String']['output']>;
};

/** Artikkel - idebanken:artikkel */
export type Idebanken_Artikkel = Content & {
  __typename?: 'idebanken_Artikkel';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_Artikkel_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Artikkel - idebanken:artikkel */
export type Idebanken_Artikkel_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Artikkel - idebanken:artikkel */
export type Idebanken_ArtikkelChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Artikkel - idebanken:artikkel */
export type Idebanken_ArtikkelChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Artikkel - idebanken:artikkel */
export type Idebanken_ArtikkelComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Artikkel - idebanken:artikkel */
export type Idebanken_ArtikkelPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Artikkel - idebanken:artikkel */
export type Idebanken_ArtikkelPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Artikkel - idebanken:artikkel data */
export type Idebanken_Artikkel_Data = {
  __typename?: 'idebanken_Artikkel_Data';
  authors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  description?: Maybe<Scalars['String']['output']>;
  heroImage?: Maybe<Content>;
  ingress?: Maybe<RichText>;
  overrideImage?: Maybe<Content>;
  publicationDate?: Maybe<Scalars['Date']['output']>;
  shortTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Artikkel - idebanken:artikkel data */
export type Idebanken_Artikkel_DataAuthorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Artikkel - idebanken:artikkel data */
export type Idebanken_Artikkel_DataIngressArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Lynkurs - idebanken:crash-course */
export type Idebanken_CrashCourse = Content & {
  __typename?: 'idebanken_CrashCourse';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_CrashCourse_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Lynkurs - idebanken:crash-course */
export type Idebanken_CrashCourse_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Lynkurs - idebanken:crash-course */
export type Idebanken_CrashCourseChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Lynkurs - idebanken:crash-course */
export type Idebanken_CrashCourseChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Lynkurs - idebanken:crash-course */
export type Idebanken_CrashCourseComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Lynkurs - idebanken:crash-course */
export type Idebanken_CrashCoursePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Lynkurs - idebanken:crash-course */
export type Idebanken_CrashCoursePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Lynkurs intro / kursstart - idebanken:crash-course-intro */
export type Idebanken_CrashCourseIntro = Content & {
  __typename?: 'idebanken_CrashCourseIntro';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_CrashCourseIntro_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Lynkurs intro / kursstart - idebanken:crash-course-intro */
export type Idebanken_CrashCourseIntro_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Lynkurs intro / kursstart - idebanken:crash-course-intro */
export type Idebanken_CrashCourseIntroChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Lynkurs intro / kursstart - idebanken:crash-course-intro */
export type Idebanken_CrashCourseIntroChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Lynkurs intro / kursstart - idebanken:crash-course-intro */
export type Idebanken_CrashCourseIntroComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Lynkurs intro / kursstart - idebanken:crash-course-intro */
export type Idebanken_CrashCourseIntroPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Lynkurs intro / kursstart - idebanken:crash-course-intro */
export type Idebanken_CrashCourseIntroPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Lynkurs intro / kursstart - idebanken:crash-course-intro data */
export type Idebanken_CrashCourseIntro_Data = {
  __typename?: 'idebanken_CrashCourseIntro_Data';
  title?: Maybe<Scalars['String']['output']>;
};

/** Lynkurs del - idebanken:crash-course-part */
export type Idebanken_CrashCoursePart = Content & {
  __typename?: 'idebanken_CrashCoursePart';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_CrashCoursePart_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Lynkurs del - idebanken:crash-course-part */
export type Idebanken_CrashCoursePart_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Lynkurs del - idebanken:crash-course-part */
export type Idebanken_CrashCoursePartChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Lynkurs del - idebanken:crash-course-part */
export type Idebanken_CrashCoursePartChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Lynkurs del - idebanken:crash-course-part */
export type Idebanken_CrashCoursePartComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Lynkurs del - idebanken:crash-course-part */
export type Idebanken_CrashCoursePartPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Lynkurs del - idebanken:crash-course-part */
export type Idebanken_CrashCoursePartPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Lynkurs del - idebanken:crash-course-part data */
export type Idebanken_CrashCoursePart_Data = {
  __typename?: 'idebanken_CrashCoursePart_Data';
  title?: Maybe<Scalars['String']['output']>;
};

/** Lynkurs slide - idebanken:crash-course-slide */
export type Idebanken_CrashCourseSlide = Content & {
  __typename?: 'idebanken_CrashCourseSlide';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_CrashCourseSlide_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Lynkurs slide - idebanken:crash-course-slide */
export type Idebanken_CrashCourseSlide_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Lynkurs slide - idebanken:crash-course-slide */
export type Idebanken_CrashCourseSlideChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Lynkurs slide - idebanken:crash-course-slide */
export type Idebanken_CrashCourseSlideChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Lynkurs slide - idebanken:crash-course-slide */
export type Idebanken_CrashCourseSlideComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Lynkurs slide - idebanken:crash-course-slide */
export type Idebanken_CrashCourseSlidePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Lynkurs slide - idebanken:crash-course-slide */
export type Idebanken_CrashCourseSlidePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Lynkurs slide - idebanken:crash-course-slide data */
export type Idebanken_CrashCourseSlide_Data = {
  __typename?: 'idebanken_CrashCourseSlide_Data';
  title?: Maybe<Scalars['String']['output']>;
};

/** Lynkurs - idebanken:crash-course data */
export type Idebanken_CrashCourse_Data = {
  __typename?: 'idebanken_CrashCourse_Data';
  backlinkContent?: Maybe<Content>;
  backlinkLabel?: Maybe<Scalars['String']['output']>;
};

/** Kjerneartikkel - idebanken:kjerneartikkel */
export type Idebanken_Kjerneartikkel = Content & {
  __typename?: 'idebanken_Kjerneartikkel';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_Kjerneartikkel_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Kjerneartikkel - idebanken:kjerneartikkel */
export type Idebanken_Kjerneartikkel_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Kjerneartikkel - idebanken:kjerneartikkel */
export type Idebanken_KjerneartikkelChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Kjerneartikkel - idebanken:kjerneartikkel */
export type Idebanken_KjerneartikkelChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Kjerneartikkel - idebanken:kjerneartikkel */
export type Idebanken_KjerneartikkelComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Kjerneartikkel - idebanken:kjerneartikkel */
export type Idebanken_KjerneartikkelPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Kjerneartikkel - idebanken:kjerneartikkel */
export type Idebanken_KjerneartikkelPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Kjerneartikkel - idebanken:kjerneartikkel data */
export type Idebanken_Kjerneartikkel_Data = {
  __typename?: 'idebanken_Kjerneartikkel_Data';
  authors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  description?: Maybe<Scalars['String']['output']>;
  ingress?: Maybe<RichText>;
  overrideImage?: Maybe<Content>;
  publicationDate?: Maybe<Scalars['Date']['output']>;
  shortTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Kjerneartikkel - idebanken:kjerneartikkel data */
export type Idebanken_Kjerneartikkel_DataAuthorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Kjerneartikkel - idebanken:kjerneartikkel data */
export type Idebanken_Kjerneartikkel_DataIngressArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Kategoriside - idebanken:section-page */
export type Idebanken_SectionPage = Content & {
  __typename?: 'idebanken_SectionPage';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_SectionPage_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Kategoriside - idebanken:section-page */
export type Idebanken_SectionPage_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Kategoriside - idebanken:section-page */
export type Idebanken_SectionPageChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Kategoriside - idebanken:section-page */
export type Idebanken_SectionPageChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Kategoriside - idebanken:section-page */
export type Idebanken_SectionPageComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Kategoriside - idebanken:section-page */
export type Idebanken_SectionPagePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Kategoriside - idebanken:section-page */
export type Idebanken_SectionPagePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Kategoriside - idebanken:section-page data */
export type Idebanken_SectionPage_Data = {
  __typename?: 'idebanken_SectionPage_Data';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Content>;
  ingress?: Maybe<RichText>;
  overrideImage?: Maybe<Content>;
  shortTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Kategoriside - idebanken:section-page data */
export type Idebanken_SectionPage_DataIngressArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Aktuelt - idebanken:singleton-aktuelt */
export type Idebanken_SingletonAktuelt = Content & {
  __typename?: 'idebanken_SingletonAktuelt';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Aktuelt - idebanken:singleton-aktuelt */
export type Idebanken_SingletonAktuelt_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Aktuelt - idebanken:singleton-aktuelt */
export type Idebanken_SingletonAktueltChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Aktuelt - idebanken:singleton-aktuelt */
export type Idebanken_SingletonAktueltChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Aktuelt - idebanken:singleton-aktuelt */
export type Idebanken_SingletonAktueltComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Aktuelt - idebanken:singleton-aktuelt */
export type Idebanken_SingletonAktueltPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Aktuelt - idebanken:singleton-aktuelt */
export type Idebanken_SingletonAktueltPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Aktuelt side - idebanken:singleton-aktuelt-page */
export type Idebanken_SingletonAktueltPage = Content & {
  __typename?: 'idebanken_SingletonAktueltPage';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_SingletonAktueltPage_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Aktuelt side - idebanken:singleton-aktuelt-page */
export type Idebanken_SingletonAktueltPage_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Aktuelt side - idebanken:singleton-aktuelt-page */
export type Idebanken_SingletonAktueltPageChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Aktuelt side - idebanken:singleton-aktuelt-page */
export type Idebanken_SingletonAktueltPageChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Aktuelt side - idebanken:singleton-aktuelt-page */
export type Idebanken_SingletonAktueltPageComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Aktuelt side - idebanken:singleton-aktuelt-page */
export type Idebanken_SingletonAktueltPagePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Aktuelt side - idebanken:singleton-aktuelt-page */
export type Idebanken_SingletonAktueltPagePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Aktuelt side - idebanken:singleton-aktuelt-page data */
export type Idebanken_SingletonAktueltPage_Data = {
  __typename?: 'idebanken_SingletonAktueltPage_Data';
  description?: Maybe<Scalars['String']['output']>;
  ingress?: Maybe<RichText>;
  overrideImage?: Maybe<Content>;
  shortTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Aktuelt side - idebanken:singleton-aktuelt-page data */
export type Idebanken_SingletonAktueltPage_DataIngressArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Tema - idebanken:singleton-theme */
export type Idebanken_SingletonTheme = Content & {
  __typename?: 'idebanken_SingletonTheme';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_SingletonTheme_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Tema - idebanken:singleton-theme */
export type Idebanken_SingletonTheme_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Tema - idebanken:singleton-theme */
export type Idebanken_SingletonThemeChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Tema - idebanken:singleton-theme */
export type Idebanken_SingletonThemeChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Tema - idebanken:singleton-theme */
export type Idebanken_SingletonThemeComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Tema - idebanken:singleton-theme */
export type Idebanken_SingletonThemePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Tema - idebanken:singleton-theme */
export type Idebanken_SingletonThemePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Tema - idebanken:singleton-theme data */
export type Idebanken_SingletonTheme_Data = {
  __typename?: 'idebanken_SingletonTheme_Data';
  description?: Maybe<Scalars['String']['output']>;
  ingress?: Maybe<RichText>;
  overrideImage?: Maybe<Content>;
  shortTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Tema - idebanken:singleton-theme data */
export type Idebanken_SingletonTheme_DataIngressArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Type - idebanken:singleton-type */
export type Idebanken_SingletonType = Content & {
  __typename?: 'idebanken_SingletonType';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Type - idebanken:singleton-type */
export type Idebanken_SingletonType_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Type - idebanken:singleton-type */
export type Idebanken_SingletonTypeChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Type - idebanken:singleton-type */
export type Idebanken_SingletonTypeChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Type - idebanken:singleton-type */
export type Idebanken_SingletonTypeComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Type - idebanken:singleton-type */
export type Idebanken_SingletonTypePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Type - idebanken:singleton-type */
export type Idebanken_SingletonTypePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Spesiell side - idebanken:special-page */
export type Idebanken_SpecialPage = Content & {
  __typename?: 'idebanken_SpecialPage';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_SpecialPage_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Spesiell side - idebanken:special-page */
export type Idebanken_SpecialPage_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Spesiell side - idebanken:special-page */
export type Idebanken_SpecialPageChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Spesiell side - idebanken:special-page */
export type Idebanken_SpecialPageChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Spesiell side - idebanken:special-page */
export type Idebanken_SpecialPageComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Spesiell side - idebanken:special-page */
export type Idebanken_SpecialPagePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Spesiell side - idebanken:special-page */
export type Idebanken_SpecialPagePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Spesiell side - idebanken:special-page data */
export type Idebanken_SpecialPage_Data = {
  __typename?: 'idebanken_SpecialPage_Data';
  description?: Maybe<Scalars['String']['output']>;
  ingress?: Maybe<RichText>;
  overrideImage?: Maybe<Content>;
  shortTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Spesiell side - idebanken:special-page data */
export type Idebanken_SpecialPage_DataIngressArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Tema - idebanken:theme-tag */
export type Idebanken_ThemeTag = Content & {
  __typename?: 'idebanken_ThemeTag';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_ThemeTag_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Tema - idebanken:theme-tag */
export type Idebanken_ThemeTag_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Tema - idebanken:theme-tag */
export type Idebanken_ThemeTagChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Tema - idebanken:theme-tag */
export type Idebanken_ThemeTagChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Tema - idebanken:theme-tag */
export type Idebanken_ThemeTagComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Tema - idebanken:theme-tag */
export type Idebanken_ThemeTagPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Tema - idebanken:theme-tag */
export type Idebanken_ThemeTagPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Tema - idebanken:theme-tag data */
export type Idebanken_ThemeTag_Data = {
  __typename?: 'idebanken_ThemeTag_Data';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Content>;
  ingress?: Maybe<RichText>;
  overrideImage?: Maybe<Content>;
  shortTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Tema - idebanken:theme-tag data */
export type Idebanken_ThemeTag_DataIngressArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Type - idebanken:type-tag */
export type Idebanken_TypeTag = Content & {
  __typename?: 'idebanken_TypeTag';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_TypeTag_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Type - idebanken:type-tag */
export type Idebanken_TypeTag_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Type - idebanken:type-tag */
export type Idebanken_TypeTagChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Type - idebanken:type-tag */
export type Idebanken_TypeTagChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Type - idebanken:type-tag */
export type Idebanken_TypeTagComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Type - idebanken:type-tag */
export type Idebanken_TypeTagPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Type - idebanken:type-tag */
export type Idebanken_TypeTagPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Type - idebanken:type-tag data */
export type Idebanken_TypeTag_Data = {
  __typename?: 'idebanken_TypeTag_Data';
  color?: Maybe<Scalars['String']['output']>;
};

/** Qbrick Video - idebanken:video */
export type Idebanken_Video = Content & {
  __typename?: 'idebanken_Video';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Idebanken_Video_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Qbrick Video - idebanken:video */
export type Idebanken_Video_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Qbrick Video - idebanken:video */
export type Idebanken_VideoChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Qbrick Video - idebanken:video */
export type Idebanken_VideoChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Qbrick Video - idebanken:video */
export type Idebanken_VideoComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Qbrick Video - idebanken:video */
export type Idebanken_VideoPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Qbrick Video - idebanken:video */
export type Idebanken_VideoPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Qbrick Video - idebanken:video data */
export type Idebanken_Video_Data = {
  __typename?: 'idebanken_Video_Data';
  accountId?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  mediaId?: Maybe<Scalars['String']['output']>;
  poster?: Maybe<Content>;
  subtitles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Qbrick Video - idebanken:video data */
export type Idebanken_Video_DataSubtitlesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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

/** Adresse - org.idebanken.app:Adresse */
export type Org_Idebanken_App_Adresse = Content & {
  __typename?: 'org_idebanken_app_Adresse';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_Adresse_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Adresse - org.idebanken.app:Adresse */
export type Org_Idebanken_App_Adresse_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Adresse - org.idebanken.app:Adresse */
export type Org_Idebanken_App_AdresseChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Adresse - org.idebanken.app:Adresse */
export type Org_Idebanken_App_AdresseChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Adresse - org.idebanken.app:Adresse */
export type Org_Idebanken_App_AdresseComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Adresse - org.idebanken.app:Adresse */
export type Org_Idebanken_App_AdressePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Adresse - org.idebanken.app:Adresse */
export type Org_Idebanken_App_AdressePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Adresse - org.idebanken.app:Adresse data */
export type Org_Idebanken_App_Adresse_Data = {
  __typename?: 'org_idebanken_app_Adresse_Data';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  address3?: Maybe<Scalars['String']['output']>;
  address4?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  html?: Maybe<RichText>;
};


/** Adresse - org.idebanken.app:Adresse data */
export type Org_Idebanken_App_Adresse_DataHtmlArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Artikkel - org.idebanken.app:Artikkel */
export type Org_Idebanken_App_Artikkel = Content & {
  __typename?: 'org_idebanken_app_Artikkel';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_Artikkel_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Artikkel - org.idebanken.app:Artikkel */
export type Org_Idebanken_App_Artikkel_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Artikkel - org.idebanken.app:Artikkel */
export type Org_Idebanken_App_ArtikkelChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel */
export type Org_Idebanken_App_ArtikkelChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel */
export type Org_Idebanken_App_ArtikkelComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel */
export type Org_Idebanken_App_ArtikkelPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel */
export type Org_Idebanken_App_ArtikkelPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Artikkel - org.idebanken.app:Artikkel data */
export type Org_Idebanken_App_Artikkel_Data = {
  __typename?: 'org_idebanken_app_Artikkel_Data';
  author?: Maybe<Scalars['String']['output']>;
  author_relatedcontent?: Maybe<Content>;
  category?: Maybe<Array<Maybe<Content>>>;
  eksternUrl?: Maybe<Scalars['String']['output']>;
  facts?: Maybe<Array<Maybe<Content>>>;
  hideInSearch?: Maybe<Scalars['Boolean']['output']>;
  hide_publishinfo?: Maybe<Scalars['Boolean']['output']>;
  images?: Maybe<Array<Maybe<Org_Idebanken_App_Artikkel_Images>>>;
  ingress?: Maybe<Scalars['String']['output']>;
  listheading?: Maybe<Scalars['String']['output']>;
  meta_description?: Maybe<Scalars['String']['output']>;
  meta_title?: Maybe<Scalars['String']['output']>;
  newFacts?: Maybe<Array<Maybe<Org_Idebanken_App_Artikkel_NewFacts>>>;
  photo?: Maybe<Scalars['String']['output']>;
  printmaterials?: Maybe<Array<Maybe<Org_Idebanken_App_Artikkel_Printmaterials>>>;
  relatedarticles?: Maybe<Array<Maybe<Content>>>;
  relatedarticles_heading?: Maybe<Scalars['String']['output']>;
  relatedlink?: Maybe<Array<Maybe<Org_Idebanken_App_Artikkel_Relatedlink>>>;
  relatedlinks_heading?: Maybe<Scalars['String']['output']>;
  subheading?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  teaserimage?: Maybe<Content>;
  teaseringress?: Maybe<Scalars['String']['output']>;
  text?: Maybe<RichText>;
  youtube?: Maybe<Scalars['String']['output']>;
  youtube_cover?: Maybe<Content>;
  youtube_cover_first?: Maybe<Scalars['Boolean']['output']>;
};


/** Artikkel - org.idebanken.app:Artikkel data */
export type Org_Idebanken_App_Artikkel_DataCategoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel data */
export type Org_Idebanken_App_Artikkel_DataFactsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel data */
export type Org_Idebanken_App_Artikkel_DataImagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel data */
export type Org_Idebanken_App_Artikkel_DataNewFactsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel data */
export type Org_Idebanken_App_Artikkel_DataPrintmaterialsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel data */
export type Org_Idebanken_App_Artikkel_DataRelatedarticlesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel data */
export type Org_Idebanken_App_Artikkel_DataRelatedlinkArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Artikkel - org.idebanken.app:Artikkel data */
export type Org_Idebanken_App_Artikkel_DataTextArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Bildegalleri */
export type Org_Idebanken_App_Artikkel_Images = {
  __typename?: 'org_idebanken_app_Artikkel_Images';
  image?: Maybe<Content>;
  imagecaption?: Maybe<Scalars['String']['output']>;
};

/** New facts */
export type Org_Idebanken_App_Artikkel_NewFacts = {
  __typename?: 'org_idebanken_app_Artikkel_NewFacts';
  factHeading?: Maybe<Scalars['String']['output']>;
  factText?: Maybe<RichText>;
};


/** New facts */
export type Org_Idebanken_App_Artikkel_NewFactsFactTextArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Temahefter */
export type Org_Idebanken_App_Artikkel_Printmaterials = {
  __typename?: 'org_idebanken_app_Artikkel_Printmaterials';
  printmaterial?: Maybe<Content>;
  printmaterial_linktext?: Maybe<Scalars['String']['output']>;
};

/** Relaterte lenker */
export type Org_Idebanken_App_Artikkel_Relatedlink = {
  __typename?: 'org_idebanken_app_Artikkel_Relatedlink';
  relatedlink_contents?: Maybe<Content>;
  relatedlink_description?: Maybe<Scalars['String']['output']>;
  relatedlink_target?: Maybe<Scalars['String']['output']>;
};

/** Ekstern - org.idebanken.app:Ekstern */
export type Org_Idebanken_App_Ekstern = Content & {
  __typename?: 'org_idebanken_app_Ekstern';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_Ekstern_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Ekstern - org.idebanken.app:Ekstern */
export type Org_Idebanken_App_Ekstern_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Ekstern - org.idebanken.app:Ekstern */
export type Org_Idebanken_App_EksternChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Ekstern - org.idebanken.app:Ekstern */
export type Org_Idebanken_App_EksternChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Ekstern - org.idebanken.app:Ekstern */
export type Org_Idebanken_App_EksternComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Ekstern - org.idebanken.app:Ekstern */
export type Org_Idebanken_App_EksternPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Ekstern - org.idebanken.app:Ekstern */
export type Org_Idebanken_App_EksternPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Ekstern_lenke - org.idebanken.app:Ekstern_lenke */
export type Org_Idebanken_App_EksternLenke = Content & {
  __typename?: 'org_idebanken_app_EksternLenke';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_EksternLenke_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Ekstern_lenke - org.idebanken.app:Ekstern_lenke */
export type Org_Idebanken_App_EksternLenke_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Ekstern_lenke - org.idebanken.app:Ekstern_lenke */
export type Org_Idebanken_App_EksternLenkeChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Ekstern_lenke - org.idebanken.app:Ekstern_lenke */
export type Org_Idebanken_App_EksternLenkeChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Ekstern_lenke - org.idebanken.app:Ekstern_lenke */
export type Org_Idebanken_App_EksternLenkeComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Ekstern_lenke - org.idebanken.app:Ekstern_lenke */
export type Org_Idebanken_App_EksternLenkePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Ekstern_lenke - org.idebanken.app:Ekstern_lenke */
export type Org_Idebanken_App_EksternLenkePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Ekstern_lenke - org.idebanken.app:Ekstern_lenke data */
export type Org_Idebanken_App_EksternLenke_Data = {
  __typename?: 'org_idebanken_app_EksternLenke_Data';
  emneord?: Maybe<Array<Maybe<Content>>>;
  heading?: Maybe<Scalars['String']['output']>;
  list_description?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


/** Ekstern_lenke - org.idebanken.app:Ekstern_lenke data */
export type Org_Idebanken_App_EksternLenke_DataEmneordArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Ekstern - org.idebanken.app:Ekstern data */
export type Org_Idebanken_App_Ekstern_Data = {
  __typename?: 'org_idebanken_app_Ekstern_Data';
  byline?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ingress?: Maybe<Scalars['String']['output']>;
  samewindow?: Maybe<Scalars['Boolean']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  teaserimage?: Maybe<Content>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  wordcount?: Maybe<Scalars['String']['output']>;
};

/** Faktaboks - org.idebanken.app:Faktaboks */
export type Org_Idebanken_App_Faktaboks = Content & {
  __typename?: 'org_idebanken_app_Faktaboks';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_Faktaboks_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Faktaboks - org.idebanken.app:Faktaboks */
export type Org_Idebanken_App_Faktaboks_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Faktaboks - org.idebanken.app:Faktaboks */
export type Org_Idebanken_App_FaktaboksChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Faktaboks - org.idebanken.app:Faktaboks */
export type Org_Idebanken_App_FaktaboksChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Faktaboks - org.idebanken.app:Faktaboks */
export type Org_Idebanken_App_FaktaboksComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Faktaboks - org.idebanken.app:Faktaboks */
export type Org_Idebanken_App_FaktaboksPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Faktaboks - org.idebanken.app:Faktaboks */
export type Org_Idebanken_App_FaktaboksPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Faktaboks - org.idebanken.app:Faktaboks data */
export type Org_Idebanken_App_Faktaboks_Data = {
  __typename?: 'org_idebanken_app_Faktaboks_Data';
  archive_name?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  text?: Maybe<RichText>;
};


/** Faktaboks - org.idebanken.app:Faktaboks data */
export type Org_Idebanken_App_Faktaboks_DataTextArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel */
export type Org_Idebanken_App_IdebankenArtikkel = Content & {
  __typename?: 'org_idebanken_app_IdebankenArtikkel';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_IdebankenArtikkel_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel */
export type Org_Idebanken_App_IdebankenArtikkel_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel */
export type Org_Idebanken_App_IdebankenArtikkelChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel */
export type Org_Idebanken_App_IdebankenArtikkelChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel */
export type Org_Idebanken_App_IdebankenArtikkelComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel */
export type Org_Idebanken_App_IdebankenArtikkelPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel */
export type Org_Idebanken_App_IdebankenArtikkelPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Hovedbilder og bildetekst */
export type Org_Idebanken_App_IdebankenArtikkel_Article = {
  __typename?: 'org_idebanken_app_IdebankenArtikkel_Article';
  images?: Maybe<Array<Maybe<Org_Idebanken_App_IdebankenArtikkel_Images>>>;
};


/** Hovedbilder og bildetekst */
export type Org_Idebanken_App_IdebankenArtikkel_ArticleImagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel data */
export type Org_Idebanken_App_IdebankenArtikkel_Data = {
  __typename?: 'org_idebanken_app_IdebankenArtikkel_Data';
  article?: Maybe<Org_Idebanken_App_IdebankenArtikkel_Article>;
  author?: Maybe<Scalars['String']['output']>;
  author_relatedcontent?: Maybe<Content>;
  category?: Maybe<Array<Maybe<Content>>>;
  enablecomments?: Maybe<Scalars['Boolean']['output']>;
  facts?: Maybe<Array<Maybe<Org_Idebanken_App_IdebankenArtikkel_Facts>>>;
  facts_heading?: Maybe<Scalars['String']['output']>;
  facts_ingress?: Maybe<Scalars['String']['output']>;
  hideInSearch?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Content>;
  ingress?: Maybe<Scalars['String']['output']>;
  links2?: Maybe<Org_Idebanken_App_IdebankenArtikkel_Links2>;
  photo?: Maybe<Scalars['String']['output']>;
  readmore?: Maybe<Scalars['String']['output']>;
  subheading?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  text?: Maybe<RichText>;
};


/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel data */
export type Org_Idebanken_App_IdebankenArtikkel_DataCategoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel data */
export type Org_Idebanken_App_IdebankenArtikkel_DataFactsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Idebanken_artikkel - org.idebanken.app:Idebanken_artikkel data */
export type Org_Idebanken_App_IdebankenArtikkel_DataTextArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Faktaboks: Listepunkter */
export type Org_Idebanken_App_IdebankenArtikkel_Facts = {
  __typename?: 'org_idebanken_app_IdebankenArtikkel_Facts';
  fact?: Maybe<Scalars['String']['output']>;
};

/** Hovedbilder og bildetekst */
export type Org_Idebanken_App_IdebankenArtikkel_Images = {
  __typename?: 'org_idebanken_app_IdebankenArtikkel_Images';
  image?: Maybe<Content>;
  text?: Maybe<Scalars['String']['output']>;
};

/** Mer informasjon */
export type Org_Idebanken_App_IdebankenArtikkel_Link = {
  __typename?: 'org_idebanken_app_IdebankenArtikkel_Link';
  contents?: Maybe<Array<Maybe<Content>>>;
  description2?: Maybe<Scalars['String']['output']>;
  destination2?: Maybe<Scalars['String']['output']>;
};


/** Mer informasjon */
export type Org_Idebanken_App_IdebankenArtikkel_LinkContentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Mer informasjon */
export type Org_Idebanken_App_IdebankenArtikkel_Links2 = {
  __typename?: 'org_idebanken_app_IdebankenArtikkel_Links2';
  link?: Maybe<Array<Maybe<Org_Idebanken_App_IdebankenArtikkel_Link>>>;
};


/** Mer informasjon */
export type Org_Idebanken_App_IdebankenArtikkel_Links2LinkArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Idebanken_produkt - org.idebanken.app:Idebanken_produkt */
export type Org_Idebanken_App_IdebankenProdukt = Content & {
  __typename?: 'org_idebanken_app_IdebankenProdukt';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_IdebankenProdukt_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Idebanken_produkt - org.idebanken.app:Idebanken_produkt */
export type Org_Idebanken_App_IdebankenProdukt_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Idebanken_produkt - org.idebanken.app:Idebanken_produkt */
export type Org_Idebanken_App_IdebankenProduktChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Idebanken_produkt - org.idebanken.app:Idebanken_produkt */
export type Org_Idebanken_App_IdebankenProduktChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Idebanken_produkt - org.idebanken.app:Idebanken_produkt */
export type Org_Idebanken_App_IdebankenProduktComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Idebanken_produkt - org.idebanken.app:Idebanken_produkt */
export type Org_Idebanken_App_IdebankenProduktPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Idebanken_produkt - org.idebanken.app:Idebanken_produkt */
export type Org_Idebanken_App_IdebankenProduktPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Idebanken_produkt - org.idebanken.app:Idebanken_produkt data */
export type Org_Idebanken_App_IdebankenProdukt_Data = {
  __typename?: 'org_idebanken_app_IdebankenProdukt_Data';
  articlenumber?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte */
export type Org_Idebanken_App_IdebankenTemahefte = Content & {
  __typename?: 'org_idebanken_app_IdebankenTemahefte';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_IdebankenTemahefte_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte */
export type Org_Idebanken_App_IdebankenTemahefte_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte */
export type Org_Idebanken_App_IdebankenTemahefteChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte */
export type Org_Idebanken_App_IdebankenTemahefteChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte */
export type Org_Idebanken_App_IdebankenTemahefteComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte */
export type Org_Idebanken_App_IdebankenTemaheftePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte */
export type Org_Idebanken_App_IdebankenTemaheftePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte data */
export type Org_Idebanken_App_IdebankenTemahefte_Data = {
  __typename?: 'org_idebanken_app_IdebankenTemahefte_Data';
  api_book_key?: Maybe<Scalars['String']['output']>;
  external_view_url_nb?: Maybe<Scalars['String']['output']>;
  external_view_url_newwindow?: Maybe<Scalars['Boolean']['output']>;
  external_view_url_nn?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Content>;
  ingress?: Maybe<Scalars['String']['output']>;
  languages?: Maybe<Array<Maybe<Org_Idebanken_App_IdebankenTemahefte_Languages>>>;
  links?: Maybe<Array<Maybe<Org_Idebanken_App_IdebankenTemahefte_Links>>>;
  product?: Maybe<Array<Maybe<Org_Idebanken_App_IdebankenTemahefte_Product>>>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte data */
export type Org_Idebanken_App_IdebankenTemahefte_DataLanguagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte data */
export type Org_Idebanken_App_IdebankenTemahefte_DataLinksArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Idebanken_temahefte - org.idebanken.app:Idebanken_temahefte data */
export type Org_Idebanken_App_IdebankenTemahefte_DataProductArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** languages-from-api */
export type Org_Idebanken_App_IdebankenTemahefte_Languages = {
  __typename?: 'org_idebanken_app_IdebankenTemahefte_Languages';
  api_key?: Maybe<Scalars['String']['output']>;
  api_langcode?: Maybe<Scalars['String']['output']>;
  api_langtitle?: Maybe<Scalars['String']['output']>;
  coverimage?: Maybe<Scalars['String']['output']>;
  firstpage?: Maybe<Scalars['String']['output']>;
};

/** Lenker og filer */
export type Org_Idebanken_App_IdebankenTemahefte_Links = {
  __typename?: 'org_idebanken_app_IdebankenTemahefte_Links';
  content_link?: Maybe<Content>;
  link_description?: Maybe<Scalars['String']['output']>;
};

/** Produkter */
export type Org_Idebanken_App_IdebankenTemahefte_Product = {
  __typename?: 'org_idebanken_app_IdebankenTemahefte_Product';
  maalform?: Maybe<Scalars['String']['output']>;
  productcontent?: Maybe<Content>;
};

/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel = Content & {
  __typename?: 'org_idebanken_app_IdebankenVirksomhetseksempel';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_IdebankenVirksomhetseksempel_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel */
export type Org_Idebanken_App_IdebankenVirksomhetseksempelChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel */
export type Org_Idebanken_App_IdebankenVirksomhetseksempelChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel */
export type Org_Idebanken_App_IdebankenVirksomhetseksempelComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel */
export type Org_Idebanken_App_IdebankenVirksomhetseksempelPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel */
export type Org_Idebanken_App_IdebankenVirksomhetseksempelPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Hovedbilder og bildetekst */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_Article = {
  __typename?: 'org_idebanken_app_IdebankenVirksomhetseksempel_Article';
  images?: Maybe<Array<Maybe<Org_Idebanken_App_IdebankenVirksomhetseksempel_Images>>>;
};


/** Hovedbilder og bildetekst */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_ArticleImagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel data */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_Data = {
  __typename?: 'org_idebanken_app_IdebankenVirksomhetseksempel_Data';
  article?: Maybe<Org_Idebanken_App_IdebankenVirksomhetseksempel_Article>;
  author?: Maybe<Scalars['String']['output']>;
  author_relatedcontent?: Maybe<Content>;
  business?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Array<Maybe<Content>>>;
  company?: Maybe<Scalars['String']['output']>;
  county?: Maybe<Scalars['String']['output']>;
  enablecomments?: Maybe<Scalars['Boolean']['output']>;
  facts?: Maybe<Array<Maybe<Org_Idebanken_App_IdebankenVirksomhetseksempel_Facts>>>;
  facts_heading?: Maybe<Scalars['String']['output']>;
  facts_ingress?: Maybe<Scalars['String']['output']>;
  hideInSearch?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Content>;
  ingress?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Org_Idebanken_App_IdebankenVirksomhetseksempel_Links>;
  links2?: Maybe<Org_Idebanken_App_IdebankenVirksomhetseksempel_Links2>;
  listheading?: Maybe<Scalars['String']['output']>;
  no_show?: Maybe<Scalars['Boolean']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  readmore?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  text?: Maybe<RichText>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel data */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_DataCategoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel data */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_DataFactsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** Idebanken_virksomhetseksempel - org.idebanken.app:Idebanken_virksomhetseksempel data */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_DataTextArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Tilleggsinformasjon: Listepunkter */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_Facts = {
  __typename?: 'org_idebanken_app_IdebankenVirksomhetseksempel_Facts';
  fact?: Maybe<Scalars['String']['output']>;
};

/** Hovedbilder og bildetekst */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_Images = {
  __typename?: 'org_idebanken_app_IdebankenVirksomhetseksempel_Images';
  image?: Maybe<Content>;
  text?: Maybe<Scalars['String']['output']>;
};

/** Mer fra virksomheten */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_Link = {
  __typename?: 'org_idebanken_app_IdebankenVirksomhetseksempel_Link';
  contents?: Maybe<Array<Maybe<Content>>>;
  description?: Maybe<Scalars['String']['output']>;
  destination?: Maybe<Scalars['String']['output']>;
};


/** Mer fra virksomheten */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_LinkContentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Mer informasjon */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_Link_2 = {
  __typename?: 'org_idebanken_app_IdebankenVirksomhetseksempel_Link_2';
  contents?: Maybe<Array<Maybe<Content>>>;
  description2?: Maybe<Scalars['String']['output']>;
  destination2?: Maybe<Scalars['String']['output']>;
};


/** Mer informasjon */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_Link_2ContentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Mer fra virksomheten */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_Links = {
  __typename?: 'org_idebanken_app_IdebankenVirksomhetseksempel_Links';
  link?: Maybe<Array<Maybe<Org_Idebanken_App_IdebankenVirksomhetseksempel_Link>>>;
};


/** Mer fra virksomheten */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_LinksLinkArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Mer informasjon */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_Links2 = {
  __typename?: 'org_idebanken_app_IdebankenVirksomhetseksempel_Links2';
  link?: Maybe<Array<Maybe<Org_Idebanken_App_IdebankenVirksomhetseksempel_Link_2>>>;
};


/** Mer informasjon */
export type Org_Idebanken_App_IdebankenVirksomhetseksempel_Links2LinkArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Kampanjeboks - org.idebanken.app:Kampanjeboks */
export type Org_Idebanken_App_Kampanjeboks = Content & {
  __typename?: 'org_idebanken_app_Kampanjeboks';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_Kampanjeboks_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Kampanjeboks - org.idebanken.app:Kampanjeboks */
export type Org_Idebanken_App_Kampanjeboks_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Kampanjeboks - org.idebanken.app:Kampanjeboks */
export type Org_Idebanken_App_KampanjeboksChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Kampanjeboks - org.idebanken.app:Kampanjeboks */
export type Org_Idebanken_App_KampanjeboksChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Kampanjeboks - org.idebanken.app:Kampanjeboks */
export type Org_Idebanken_App_KampanjeboksComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Kampanjeboks - org.idebanken.app:Kampanjeboks */
export type Org_Idebanken_App_KampanjeboksPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Kampanjeboks - org.idebanken.app:Kampanjeboks */
export type Org_Idebanken_App_KampanjeboksPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Kampanjeboks - org.idebanken.app:Kampanjeboks data */
export type Org_Idebanken_App_Kampanjeboks_Data = {
  __typename?: 'org_idebanken_app_Kampanjeboks_Data';
  branding?: Maybe<Scalars['String']['output']>;
  ingress?: Maybe<Scalars['String']['output']>;
  link_as_html?: Maybe<RichText>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Kampanjeboks - org.idebanken.app:Kampanjeboks data */
export type Org_Idebanken_App_Kampanjeboks_DataLink_As_HtmlArgs = {
  processHtml?: InputMaybe<ProcessHtmlInput>;
};

/** Kategori - org.idebanken.app:Kategori */
export type Org_Idebanken_App_Kategori = Content & {
  __typename?: 'org_idebanken_app_Kategori';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Kategori - org.idebanken.app:Kategori */
export type Org_Idebanken_App_Kategori_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Kategori - org.idebanken.app:Kategori */
export type Org_Idebanken_App_KategoriChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Kategori - org.idebanken.app:Kategori */
export type Org_Idebanken_App_KategoriChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Kategori - org.idebanken.app:Kategori */
export type Org_Idebanken_App_KategoriComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Kategori - org.idebanken.app:Kategori */
export type Org_Idebanken_App_KategoriPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Kategori - org.idebanken.app:Kategori */
export type Org_Idebanken_App_KategoriPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Kontaktperson - org.idebanken.app:Kontaktperson */
export type Org_Idebanken_App_Kontaktperson = Content & {
  __typename?: 'org_idebanken_app_Kontaktperson';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_Kontaktperson_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Kontaktperson - org.idebanken.app:Kontaktperson */
export type Org_Idebanken_App_Kontaktperson_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Kontaktperson - org.idebanken.app:Kontaktperson */
export type Org_Idebanken_App_KontaktpersonChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Kontaktperson - org.idebanken.app:Kontaktperson */
export type Org_Idebanken_App_KontaktpersonChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Kontaktperson - org.idebanken.app:Kontaktperson */
export type Org_Idebanken_App_KontaktpersonComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Kontaktperson - org.idebanken.app:Kontaktperson */
export type Org_Idebanken_App_KontaktpersonPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Kontaktperson - org.idebanken.app:Kontaktperson */
export type Org_Idebanken_App_KontaktpersonPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Kontaktperson - org.idebanken.app:Kontaktperson data */
export type Org_Idebanken_App_Kontaktperson_Data = {
  __typename?: 'org_idebanken_app_Kontaktperson_Data';
  email?: Maybe<Scalars['String']['output']>;
  gplus?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Content>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
};

/** Landing page - org.idebanken.app:landing-page */
export type Org_Idebanken_App_LandingPage = Content & {
  __typename?: 'org_idebanken_app_LandingPage';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Landing page - org.idebanken.app:landing-page */
export type Org_Idebanken_App_LandingPage_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Landing page - org.idebanken.app:landing-page */
export type Org_Idebanken_App_LandingPageChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Landing page - org.idebanken.app:landing-page */
export type Org_Idebanken_App_LandingPageChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Landing page - org.idebanken.app:landing-page */
export type Org_Idebanken_App_LandingPageComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Landing page - org.idebanken.app:landing-page */
export type Org_Idebanken_App_LandingPagePageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Landing page - org.idebanken.app:landing-page */
export type Org_Idebanken_App_LandingPagePageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** URL - org.idebanken.app:url */
export type Org_Idebanken_App_Url = Content & {
  __typename?: 'org_idebanken_app_Url';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_Url_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** URL - org.idebanken.app:url */
export type Org_Idebanken_App_Url_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** URL - org.idebanken.app:url */
export type Org_Idebanken_App_UrlChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** URL - org.idebanken.app:url */
export type Org_Idebanken_App_UrlChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** URL - org.idebanken.app:url */
export type Org_Idebanken_App_UrlComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** URL - org.idebanken.app:url */
export type Org_Idebanken_App_UrlPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** URL - org.idebanken.app:url */
export type Org_Idebanken_App_UrlPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** URL - org.idebanken.app:url data */
export type Org_Idebanken_App_Url_Data = {
  __typename?: 'org_idebanken_app_Url_Data';
  url?: Maybe<Scalars['String']['output']>;
};

/** Temahefte - org.idebanken.app.extensions:pamphlet */
export type Org_Idebanken_App_Extensions_Pamphlet = Content & {
  __typename?: 'org_idebanken_app_extensions_Pamphlet';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_Extensions_Pamphlet_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Temahefte - org.idebanken.app.extensions:pamphlet */
export type Org_Idebanken_App_Extensions_Pamphlet_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Temahefte - org.idebanken.app.extensions:pamphlet */
export type Org_Idebanken_App_Extensions_PamphletChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Temahefte - org.idebanken.app.extensions:pamphlet */
export type Org_Idebanken_App_Extensions_PamphletChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Temahefte - org.idebanken.app.extensions:pamphlet */
export type Org_Idebanken_App_Extensions_PamphletComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Temahefte - org.idebanken.app.extensions:pamphlet */
export type Org_Idebanken_App_Extensions_PamphletPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Temahefte - org.idebanken.app.extensions:pamphlet */
export type Org_Idebanken_App_Extensions_PamphletPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** knapp/lenke */
export type Org_Idebanken_App_Extensions_Pamphlet_Buttons = {
  __typename?: 'org_idebanken_app_extensions_Pamphlet_Buttons';
  file?: Maybe<Content>;
  label?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Temahefte - org.idebanken.app.extensions:pamphlet data */
export type Org_Idebanken_App_Extensions_Pamphlet_Data = {
  __typename?: 'org_idebanken_app_extensions_Pamphlet_Data';
  buttons?: Maybe<Array<Maybe<Org_Idebanken_App_Extensions_Pamphlet_Buttons>>>;
  description?: Maybe<Scalars['String']['output']>;
  previewImage?: Maybe<Content>;
};


/** Temahefte - org.idebanken.app.extensions:pamphlet data */
export type Org_Idebanken_App_Extensions_Pamphlet_DataButtonsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Tema Artikkel - org.idebanken.app.extensions:tema-artikkel */
export type Org_Idebanken_App_Extensions_TemaArtikkel = Content & {
  __typename?: 'org_idebanken_app_extensions_TemaArtikkel';
  _id: Scalars['ID']['output'];
  _name: Scalars['String']['output'];
  _path: Scalars['String']['output'];
  _references?: Maybe<Array<Maybe<Content>>>;
  _score?: Maybe<Scalars['Float']['output']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  backlink?: Maybe<SimpleLink>;
  children?: Maybe<Array<Maybe<Content>>>;
  childrenConnection?: Maybe<ContentConnection>;
  components?: Maybe<Array<Maybe<Component>>>;
  contentType?: Maybe<ContentType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<PrincipalKey>;
  data?: Maybe<Org_Idebanken_App_Extensions_TemaArtikkel_Data>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  x?: Maybe<ExtraData>;
  xAsJson?: Maybe<Scalars['JSON']['output']>;
};


/** Tema Artikkel - org.idebanken.app.extensions:tema-artikkel */
export type Org_Idebanken_App_Extensions_TemaArtikkel_PathArgs = {
  type?: InputMaybe<ContentPathType>;
};


/** Tema Artikkel - org.idebanken.app.extensions:tema-artikkel */
export type Org_Idebanken_App_Extensions_TemaArtikkelChildrenArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Tema Artikkel - org.idebanken.app.extensions:tema-artikkel */
export type Org_Idebanken_App_Extensions_TemaArtikkelChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** Tema Artikkel - org.idebanken.app.extensions:tema-artikkel */
export type Org_Idebanken_App_Extensions_TemaArtikkelComponentsArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Tema Artikkel - org.idebanken.app.extensions:tema-artikkel */
export type Org_Idebanken_App_Extensions_TemaArtikkelPageAsJsonArgs = {
  resolveFragment?: InputMaybe<Scalars['Boolean']['input']>;
  resolveTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Tema Artikkel - org.idebanken.app.extensions:tema-artikkel */
export type Org_Idebanken_App_Extensions_TemaArtikkelPageUrlArgs = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<UrlType>;
};

/** Tema Artikkel - org.idebanken.app.extensions:tema-artikkel data */
export type Org_Idebanken_App_Extensions_TemaArtikkel_Data = {
  __typename?: 'org_idebanken_app_extensions_TemaArtikkel_Data';
  category?: Maybe<Array<Maybe<Content>>>;
  hideInSearch?: Maybe<Scalars['Boolean']['output']>;
  hide_publishinfo?: Maybe<Scalars['Boolean']['output']>;
  ingress?: Maybe<Scalars['String']['output']>;
  listImage?: Maybe<Content>;
  tags?: Maybe<Scalars['String']['output']>;
};


/** Tema Artikkel - org.idebanken.app.extensions:tema-artikkel data */
export type Org_Idebanken_App_Extensions_TemaArtikkel_DataCategoryArgs = {
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
  backlink?: Maybe<SimpleLink>;
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
  skyraSlugs: Array<Scalars['String']['output']>;
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
