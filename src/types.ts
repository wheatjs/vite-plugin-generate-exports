export interface GenerationPattern {
  matchTokens: [string, string]
  path: string
}

export interface Options {
  patterns: GenerationPattern[]
}

export type UserOptions = Partial<Options>
