
export enum IsoLanguageCode {
    de,
    en,
    fr,

}

export enum TextMarkup {
    Text_plain,
    HTML,
    LaTeX,
    Markdown,
    DocBook,
}

export enum AnnotationRole {
    RTCSessionDescription,
    question,
    concern,
    comment,
    fixMe
}

interface Element {
    name: string,
    annotations?: Array<Annotation>
}

export interface Annotation {
    language?: IsoLanguageCode,
    markup?: TextMarkup,
    purpose?: AnnotationRole,
    body: string
}

export interface urdadModel extends Element {
    responsibilityDomains?: Array<ResponsibilityDomain>,
}

export interface ResponsibilityDomain extends Element {
    serviceContracts?: Array<ServiceContract>,

}

interface FunctionalRequirement extends Element {
    constraint?: Constraint,
}

interface DataType extends Element {}

export interface PrimitiveType extends DataType {}

export interface Boolean extends PrimitiveType {
    defaultValue?: boolean
}

export interface Integer extends PrimitiveType {
    defaultValue?: Integer
}

export interface FloatingPointNumber extends PrimitiveType {
    defaultValue?: FloatingPointNumber
}

export interface Text {
    encoding?: TextEncoding
    defaultValue: string
}

export enum TextEncoding {
    UTF_8,
    UTF_16
}

export interface Enumeration {
    options: Array<string>
}

export interface Association {
    target: PrimitiveType | DataStructure,
    roleName: string,
    multiplicityConstraint: string
}

export interface Aggregation extends Association {}

export interface Composition extends Aggregation {}

export interface DataStructure extends DataType {
    superclass?: DataStructure,
    compositionRelationships?: Array<Composition>,
    aggregationRelationships?: Array<Aggregation>,
    associationRelationships?: Array<Association>,
}

export interface Exception extends DataStructure {}

export interface Precondition extends FunctionalRequirement {
    exception?: Exception
}

export interface Postcondition extends FunctionalRequirement {}

export enum SpecificationLanguage {
    OCL,
    JavaScript,
    TypeScript
}

export interface FormalSpecification {
    specificationLanguage: SpecificationLanguage,
    body: string
}

export interface Constraint {
    informalSpec?: Annotation,
    formalSpec?: FormalSpecification
}

export interface ServiceContract extends Element {
    requestType: DataStructure,
    responseType: DataStructure,
    preconditions?: Array<Precondition>
    postconditions?: Array<Postcondition>
}

interface Requirement extends Element {
    stakeholder?: Actor | Service,
}

export interface Actor extends Element {}

export interface Service extends Element {
    realizes?: Array<ServiceContract>,
    process?: Process,
}

export interface Process extends Element {

}
