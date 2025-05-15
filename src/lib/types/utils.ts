type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

/*
 * Transfer an enum type to a literal type
 */
type ParseEnum<T extends string | number | bigint | boolean | null | undefined> = `${T}`;

/**
 * Keep some fields essential, omit some, and make others optional
 *
 * @typeParam T - the target type
 * @typeParam K - fields to keep as essential
 * @typeParam O - fields to omit (optional)
 */
type SuperPick<T, K extends keyof T, O extends keyof T = never> = Prettify<
	Omit<Pick<T, K> & Partial<Omit<T, K>>, O>
>;

/**
 * Make some fields optional, omit some, and make others essential
 *
 * @typeParam T - the target type
 * @typeParam P - fields to be partial
 * @typeParam O - fields to omit (optional)
 */
type SuperPartial<T, P extends keyof T, O extends keyof T = never> = Prettify<
	Omit<Omit<T, P> & Partial<Pick<T, P>>, O>
>;

// type A = { a: number; b: string; c: boolean };
// Omit<Pick<T, K> & Partial<Omit<T, K>>, O>

/**
 *  @deprecated Use SuperPick instead
 */
type PickPartial<T, K extends keyof T, O extends keyof T = never> = SuperPick<T, K, O>;

type NotReadonly<T> = { -readonly [P in keyof T]: T[P] };

class A {
	a = 'hello';
	b = 'foo';
	name = 'bar';

	say() {
		console.log(this.a, this.b);
	}

	get displayName() {
		return this.name;
	}
}

// Utility type to extract only instance fields
type InstanceFieldKeys<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any
	? T extends Record<K, T[K]> // Check if it's an instance field (not prototype method)
	? K
	: never
	: K;
}[keyof T];

type FieldsOnly<T> = Pick<T, InstanceFieldKeys<T>>;

// Apply the utility type to the class
type AType = FieldsOnly<A>;

export type { Prettify, ParseEnum, SuperPick, PickPartial, SuperPartial, NotReadonly };
