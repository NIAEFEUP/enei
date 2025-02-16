import { column } from "@adonisjs/lucid/orm"
import type { ColumnOptions } from "@adonisjs/lucid/types/model"

export function json(options?: Partial<ColumnOptions>) {
    return column({
        ...options,
        prepare: (value) => JSON.stringify(value),
        consume: (value) => JSON.parse(value),
    })
}