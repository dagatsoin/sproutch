
/**
 * Return the keys of the given object which match the given property type
 */
export type FilterKeysByProp<T extends object, P> = {
    [K in keyof T]-?: [P] extends [T[K]] ? K : never
  }[keyof T]
  
  /**
   * Extract all the possible keys of a union type
   */
export type KeysOfUnion<T> = T extends T ? keyof T: never;
  
  /**
   * Infers the type of an array
   */
export type ArrayElementType<T> = T extends (infer E)[] ? E : T;
  
export type UnionToIntersection<T> = 
    (T extends unknown ? (x: T) => unknown : never) extends 
    (x: infer R) => unknown ? R : never
  
export type IntersectionToUnion<T> = {
    [K in keyof T]: { [P in K]: T[K] };
  }[keyof T];
  
  /**
   * Return true if the given union U can be the given type T
   */
export type Is<U, T> = Extract<U, T> extends never ? false : true
  
  
  /**
   * Merge AdditionalFields into each object of T
   */
export type MergedUnion<T, M> = {
    [K in keyof T]: T[K] 
  } & M