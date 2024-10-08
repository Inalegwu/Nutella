import { Command } from "@effect/cli";
import { Effect, Layer } from "effect";
import pkg from "../package.json";
import helix from "./helix";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { TomlClient } from "./parser/toml";
import { JSONClient } from "./parser/json";

const main = Command.make("allagi").pipe(Command.withSubcommands([helix]));

const program = Command.run(main, {
	name: "Allagi",
	version: `v${pkg.version}`,
});

const ProgramLive = Layer.merge(BunContext.layer, TomlClient.live);

program(process.argv).pipe(
	Effect.provide(ProgramLive),
	Effect.provide(JSONClient.live),
	BunRuntime.runMain,
);
