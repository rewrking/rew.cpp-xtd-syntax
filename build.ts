import { writeFile, readFileSync, mkdir } from 'fs';
import yaml from 'js-yaml';

function themeBuilder(folder: string)
{
	const files = [
		"c_cpp_experimental"
	]

	mkdir(folder, (err: any) => {
		if (err!.code !== "EEXIST") {
			throw err;
		}

		files.forEach((file) => {
			const yml = yaml.safeLoad(readFileSync(`src/${file}.yml`, "utf-8"));
			const jsonContents = JSON.stringify(yml, null, 4);

			const outputFile = `${folder}/${file}.json`;
			writeFile(outputFile, jsonContents, (err) => {
				if (err)
					console.warn(err);

				console.log('Build finished:', outputFile);
			});
		});
	});
}

themeBuilder('syntaxes');
