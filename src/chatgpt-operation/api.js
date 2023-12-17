import OpenAI from "openai";

import { defineOperationApi } from "@directus/extensions-sdk";
import { getSetting } from "../lib/util";
import { openAIField } from "../configuration/fields";

export default defineOperationApi({
	id: "chatgpt-operation",
	handler: async (
		{
			system_messages,
			messages,
			model = "gpt-3.5-turbo",
			json_return = true,
			api_key,
			temperature = 0.5,
			max_tokens = null,
			top_p = 1,
			frequency_penalty = 0,
			presence_penalty = 0,
		},
		{ services, database, getSchema }
	) => {
		const { SettingsService } = services;
		const schema = await getSchema();
		const settings = new SettingsService({ schema, knex: database });

		const apiKey = await getSetting(settings, openAIField.field, api_key);
		const openai = new OpenAI({ apiKey });
		
		if( system_messages !=""){
			messages = [{
				"role": "system",
				"content": system_messages
			}];
		}
		else{
			messages = JSON.parse(messages)
		}

		try {
			// the completion should check if json_return is true or false and if it is true, it should return response_format: { type: "json_object" } in the completion function

			let responseFormat = json_return ? "json_object" : "text";

			// Make the API call to OpenAI
			const completion = await openai.chat.completions.create({
				model: model,
				messages: messages,
				temperature,
				max_tokens,
				top_p,
				frequency_penalty,
				presence_penalty,
				response_format: { type: responseFormat },
			});

			console.log("completion", completion);

			let response = completion.choices[0].message.content;

			if(json_return){
				response= JSON.parse(response);
			}
			console.log("response", response);

			return {
				response: response,
				usage: completion.usage,
				finish_reason: completion.choices[0].finish_reason,
			};
		} catch (err) {
			throw err;
		}
	},
});
