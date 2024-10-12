import { Schema } from "@effect/schema";

const Modifiers = Schema.Literal(
	"bold",
	"dim",
	"italic",
	"underlined",
	"slow_blink",
	"rapid_blink",
	"reversed",
	"hidden",
	"crossed_out",
);

const Style = Schema.Literal("line", "curl", "dashed", "dotted", "double_line");

const ScopeParam = Schema.Struct({
	foreground: Schema.String,
	background: Schema.String,
	underline: Schema.Struct({
		color: Schema.String,
		style: Style,
	}).pipe(Schema.optional),
	modifiers: Schema.Array(Modifiers),
}).pipe(
	Schema.rename({
		foreground: "fg",
		background: "bg",
	}),
);

const ScopeValue = Schema.Union(Schema.String, ScopeParam);

const Palette = Schema.Record({
	key: Schema.String,
	value: Schema.String,
});

const Scope = Schema.Record({
	key: Schema.String,
	value: ScopeValue,
});

export const HelixTheme = Schema.Struct({
	scope: Scope,
	palette: Palette,
	"ui.background": Schema.Struct({
		background: Schema.String.pipe(Schema.optional),
		foreground: Schema.String,
	}).pipe(
		Schema.rename({
			background: "bg",
			foreground: "fg",
		}),
	),
});

// export const HelixTheme = Schema.Record({
// 	key: Schema.String,
// 	value: Schema.Union(
// 		Schema.String,
// 		Schema.Record({
// 			key: Schema.String,
// 			value: Schema.String,
// 		}),
// 	),
// });

export type HelixTheme = typeof HelixTheme.Type;
export type Palette = typeof Palette.Type;
