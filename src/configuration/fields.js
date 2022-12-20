export const groupField = {
    "collection": "directus_settings",
    "field": "ai_pack_config",
    "type": "alias",
    "schema": null,
    "meta": {
        "collection": "directus_settings",
        "field": "ai_pack_config",
        "special": [ "alias", "no-data", "group" ],
        "interface": "group-detail",
        "options": { "headerIcon": "rocket_launch" },
        "display": null,
        "display_options": null,
        "readonly": false,
        "hidden": false,
        "sort": null,
        "width": "full",
        "translations": null,
        "note": null,
        "conditions": null,
        "required": false,
        "group": null,
        "validation": null,
        "validation_message": null
    }
};
export const openAIField = {
    "collection": "directus_settings",
    "field": "Open_AI_API_Key",
    "type": "string",
    "schema": {
        "name": "Open_AI_API_Key",
        "table": "directus_settings",
        "data_type": "varchar",
        "default_value": null,
        "max_length": 255,
        "numeric_precision": null,
        "numeric_scale": null,
        "is_generated": false,
        "generation_expression": null,
        "is_nullable": true,
        "is_unique": false,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null
    },
    "meta": {
        "collection": "directus_settings",
        "field": "Open_AI_API_Key",
        "special": null,
        "interface": "input",
        "options": { "masked": true },
        "display": null,
        "display_options": null,
        "readonly": false,
        "hidden": false,
        "sort": 2,
        "width": "full",
        "translations": null,
        "note": null,
        "conditions": null,
        "required": false,
        "group": groupField.field,
        "validation": null,
        "validation_message": null
    }
};
export const stabilityAIField = {
    "collection": "directus_settings",
    "field": "Stability_AI_API_Key",
    "type": "string",
    "schema": {
        "name": "Stability_AI_API_Key",
        "table": "directus_settings",
        "data_type": "varchar",
        "default_value": null,
        "max_length": 255,
        "numeric_precision": null,
        "numeric_scale": null,
        "is_generated": false,
        "generation_expression": null,
        "is_nullable": true,
        "is_unique": false,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null
    },
    "meta": {
        "collection": "directus_settings",
        "field": "Stability_AI_API_Key",
        "special": null,
        "interface": "input",
        "options": { "masked": true },
        "display": null,
        "display_options": null,
        "readonly": false,
        "hidden": false,
        "sort": 2,
        "width": "full",
        "translations": null,
        "note": null,
        "conditions": null,
        "required": false,
        "group": groupField.field,
        "validation": null,
        "validation_message": null
    }
};