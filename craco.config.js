const CracoLessPlugin = require('craco-less');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@primary-color': '#096dd9', '@border-radius-base': '4px' }, //blue - #096dd9, green - #1DA57A
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
