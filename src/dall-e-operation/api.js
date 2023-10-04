import { defineOperationApi } from '@directus/extensions-sdk';
import { Configuration, OpenAIApi } from "openai";
import { openAIField } from '../configuration/fields';
import { getSetting } from '../lib/util';
/*WORK IN PROGRESS (edits and variations)*/
export default defineOperationApi({
	id: 'dall-e-operation',
	handler: async (
		{ operation, text, image, mask, api_key, amount=1, size='1024x1024', save_assets=true }, 
		{ services, database, getSchema }
	) => {
		const { FilesService, SettingsService } = services;
		const schema = await getSchema();
		const settings = new SettingsService({ schema, knex: database });
		const files = new FilesService({ schema, knex: database });

		const configuration = new Configuration({ 
			apiKey: await getSetting(settings, openAIField.field, api_key)
		});
		const openai = new OpenAIApi(configuration);

		let response;
		switch (operation) {
			case 'generation':
				response = await openai.createImage({
					prompt: text, n: amount, size,
				});
				break;
			case 'edit':
				// Note: Assuming `image` and `mask` are Buffer objects or ReadStreams
				response = await openai.createImageEdit({
					image, mask, prompt: text, n: amount, size,
				});
				break;
			case 'variation':
				// Note: Assuming `image` is a Buffer object or a ReadStream
				response = await openai.createImageVariation({
					image, n: amount, size,
				});
				break;
			default:
				throw new Error('Invalid operation specified');
		}

		let result = [], ids = [];
		for (let i = 0; i < amount; i++) {
			const url = response.data.data[i].url;
			result.push(url);
			if (save_assets) {
				const id = await files.importOne(url);
				ids.push(id);
			}
		}

		return amount === 1
			? { url: result[0], id: ids[0] ?? null }
			: { url: result, id: ids };
	},
});
