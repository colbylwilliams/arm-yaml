// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import { ConversionManager } from "../ConversionManager";

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {
    var json = "{\r\n     \"lb\": {\r\n          \"image\": \"dockercloud/haproxy\",\r\n          \"links\": [\r\n               \"web\"\r\n          ],\r\n          \"ports\": [\r\n               \"80:80\"\r\n          ],\r\n          \"roles\": [\r\n               \"global\"\r\n          ]\r\n     },\r\n     \"web\": {\r\n          \"image\": \"dockercloud/quickstart-python\",\r\n          \"links\": [\r\n               \"redis\"\r\n          ],\r\n          \"target_num_containers\": 4\r\n     },\r\n     \"redis\": {\r\n          \"image\": \"redis\"\r\n     }\r\n}";
    var yaml = "lb:\r\n  image: dockercloud/haproxy\r\n  links:\r\n    - web\r\n  ports:\r\n    - \"80:80\"\r\n  roles:\r\n    - global\r\nweb:\r\n  image: dockercloud/quickstart-python\r\n  links:\r\n    - redis\r\n  target_num_containers: 4\r\nredis:\r\n  image: redis";

    // Defines a Mocha unit test
    test("Something 1", function() {
        let conversionManager = new ConversionManager(0);
        var convertYaml = conversionManager.toYAML(json);
        // remove special characters before comparison
        var formattedConvertedYaml = convertYaml.replace(/[,\s]+|[,\s]+/g, "").replace(/'/g, '').trim();
        var formattedYaml = yaml.replace(/[,\s]+|[,\s]+/g, "").replace(/"/g, '').trim();

        console.log("Output YAML");
        console.log(formattedConvertedYaml);
        console.log("------------------");
        console.log(formattedYaml);

        if (convertYaml) {
            console.log("Testing Output YAML");
            assert.equal(formattedConvertedYaml, formattedYaml);

            var convertJson = conversionManager.toJSON(convertYaml);
            var formattedConverttedJson = convertJson.replace(/[,\s]+|[,\s]+/g, "").trim();
            var formattedJson = json.replace(/[,\s]+|[,\s]+/g, "").trim();

            console.log("Output JSON");
            console.log(formattedConverttedJson);
            console.log("------------------");
            console.log(formattedJson);

            console.log("Testing Output JSON");
            assert.equal(formattedConverttedJson, formattedJson);
        }
    });
});