/**
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org)  Apache License, Version 2.0  http://www.apache.org/licenses/LICENSE-2.0
 */
define(['require', 'jquery', 'constants'],
    function (require, $, Constants) {
        var self = this;
        var Utils = function () {
        };

        var rest_client_constants = {
            HTTP_GET: "GET",
            HTTP_POST: "POST",
            HTTP_PUT: "PUT",
            HTTP_DELETE: "DELETE",
            simulatorUrl: window.location.protocol + "//" + window.location.host + "/simulation",
            editorUrl: window.location.protocol + "//" + window.location.host + '/editor'
        };

        // /**
        //  * getting extension data from back end.
        //  * @returns {Map|Map}
        //  */
        // function getExtensionDetails() { // TODO remove
        //     return new Map(Object.entries({}));
        //
        //
        //
        //
        //     // return new Map(Object.entries({
        //     //     "kafka": {
        //     //         "extensionStatus": "NOT_INSTALLED",
        //     //         "extensionInfo": {
        //     //             "name": "kafka",
        //     //             "version": "5.0.8-SNAPSHOT"
        //     //         }
        //     //     },
        //     //     "redis": {
        //     //         "extensionStatus": "NOT_INSTALLED",
        //     //         "extensionInfo": {
        //     //             "name": "redis",
        //     //             "version": "3.1.2-SNAPSHOT"
        //     //         },
        //     //         "manuallyInstall": [
        //     //             {
        //     //                 "name": "redis-clients",
        //     //                 "version": "2.3.0",
        //     //                 "download": {
        //     //                     "info": {
        //     //                         "description": "redis clients is like a one extension",
        //     //                         "install": "by using this way we can install redis-clients"
        //     //                     },
        //     //                     "autoDownloadable": false,
        //     //                     "url": "https://repo1.maven.org/maven2/org/apache/redis/redis_2.11/2.1.1/redis_2.11-2.1.1.jar"
        //     //                 },
        //     //                 "type": "BUNDLE",
        //     //                 "lookupRegex": "kafka-clients-(.+).jar"
        //     //             },
        //     //             {
        //     //                 "name": "redis-server",
        //     //                 "version": "2.3.0",
        //     //                 "download": {
        //     //                     "info": {
        //     //                         "description": "redis clients is like a one extension",
        //     //                         "install": "by using this way we can install redis-clients"
        //     //                     },
        //     //                     "autoDownloadable": false,
        //     //                     "url": "https://repo1.maven.org/maven2/org/apache/redis/redis_2.11/2.1.1/kafka_2.11-2.1.1.jar"
        //     //                 },
        //     //                 "type": "BUNDLE",
        //     //                 "lookupRegex": "kafka-server-(.+).jar"
        //     //             }
        //     //         ]
        //     //     },
        //     //     "grpc": {
        //     //         "extensionStatus": "NOT_INSTALLED",
        //     //         "extensionInfo": {
        //     //             "name": "grpc",
        //     //             "version": "3.1.2-SNAPSHOT"
        //     //         },
        //     //         "manuallyInstall": [
        //     //             {
        //     //                 "name": "grpc-clients",
        //     //                 "version": "2.3.0",
        //     //                 "download": {
        //     //                     "info": {
        //     //                         "description": "grpc clients is like a one extension",
        //     //                         "install": "by using this way we can install grpc-clients"
        //     //                     },
        //     //                     "autoDownloadable": false,
        //     //                     "url": "https://repo1.maven.org/maven2/org/apache/grpc/grpc_2.11/2.1.1/grpc_2.11-2.1.1.jar"
        //     //                 },
        //     //                 "type": "BUNDLE",
        //     //                 "lookupRegex": "grpc-clients-(.+).jar"
        //     //             },
        //     //             {
        //     //                 "name": "grpc-server",
        //     //                 "version": "2.3.0",
        //     //                 "download": {
        //     //                     "info": {
        //     //                         "description": "grpc server is like a one extension",
        //     //                         "install": "by using this way we can install grpc-server"
        //     //                     },
        //     //                     "autoDownloadable": false,
        //     //                     "url": "https://repo1.maven.org/maven2/org/apache/grpc/grpc_2.11/2.1.1/grpc_2.11-2.1.1.jar"
        //     //                 },
        //     //                 "type": "BUNDLE",
        //     //                 "lookupRegex": "grpc-server-(.+).jar"
        //     //             }
        //     //         ]
        //     //     },
        //     //     "nats": {
        //     //         "extensionStatus": "NOT_INSTALLED",
        //     //         "extensionInfo": {
        //     //             "name": "nats",
        //     //             "version": "3.1.2-SNAPSHOT"
        //     //         },
        //     //     }
        //     // }));
        // },


        /**
         * Installs or un-installs an extension.
         *
         * @param extension             Extension object.
         * @param app                   Reference of the app.
         * @param handleLoading         Function which handles the 'loading' state of the installation.
         * @param handleCallback        Callback function after a successful installation.
         * @param callerObject          The object which calls this method.
         * @param requestedActionText   The requested action, i.e: either install or un-install
         * @param callerScope           Scope of the caller.
         */
        Utils.prototype.installOrUnInstallExtension = function (extension,
                                                                app,
                                                                handleLoading,
                                                                handleCallback,
                                                                callerObject,
                                                                requestedActionText,
                                                                callerScope) {
            self.extensionInstallUninstallAlertModal = $(
                "<div class='modal fade' id='extensionAlertModal' tabindex='-1' role='dialog'" +
                " aria-tydden='true'>" +
                "<div class='modal-dialog file-dialog' role='document'>" +
                "<div class='modal-content'>" +
                "<div class='modal-header'>" +
                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
                "<i class='fw fw-cancel about-dialog-close'> </i> " +
                "</button>" +
                "<h4 class='modal-title file-dialog-title' id='newConfigModalLabel'>Confirmation<" +
                "/h4>" +
                "<hr class='style1'>" +
                "</div>" +
                "<div class='modal-body'>" +
                "<div class='container-fluid'>" +
                "<form class='form-horizontal' onsubmit='return false'>" +
                "<div class='form-group'>" +
                "<label for='configName' class='col-sm-9 file-dialog-label'>" + "Are you sure you want to install " +
                requestedActionText.toLowerCase() + " <b>" + extension.extensionInfo.name + "</b>?" +
                "</label>" +
                "</div>" +
                "<div class='form-group'>" +
                "<div class='file-dialog-form-btn'>" +
                "<button id='installUninstallId' type='button' class='btn btn-primary'>" +
                requestedActionText + "</button>" +
                "<div class='divider'/>" +
                "<button type='cancelButton' class='btn btn-default' data-dismiss='modal'>cancel</button>" +
                "</div>" +
                "</form>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            ).modal('show');

            self.extensionInstallUninstallAlertModal.find("button").filter("#installUninstallId").click(function () {
                self.extensionInstallUninstallAlertModal.modal('hide');
                var action = requestedActionText;

                // Wait until installation completes.
                if (handleLoading) {
                    var actionStatus = action + 'ing';
                    actionStatus = actionStatus.charAt(0).toUpperCase() + actionStatus.substr(1).toLowerCase();
                    handleLoading(callerObject, extension, actionStatus, callerScope);
                }

                var serviceUrl = app.config.services.extensionsInstallation.endpoint;
                var installUninstallUrl = serviceUrl + "/" + extension.extensionInfo.name + "/" + action.toLowerCase();
                $.ajax({
                    type: "POST",
                    contentType: "json",
                    url: installUninstallUrl,
                    async: true,
                    success: function (response) {
                        handleCallback(extension, response.status, callerObject, response, callerScope);
                        app.utils.extensionStatusListener.reArrangeExtensions(extension, response.status);
                    },
                    error: function (e) {
                        throw "Unable to read extension statuses"; // TODO show error message
                    }
                });
            });
        };

        Utils.prototype.retrieveSiddhiAppNames = function (successCallback, errorCallback, context) {
            $.ajax({
                async: true,
                url: rest_client_constants.editorUrl + "/artifact/listSiddhiApps",
                type: rest_client_constants.HTTP_GET,
                success: function (data) {
                    if (typeof successCallback === 'function')
                        successCallback(data, context)
                },
                error: function (msg) {
                    if (typeof errorCallback === 'function')
                        errorCallback(msg)
                }
            });
        };

        /**
         * Usage:  encode a string in base64 while converting into unicode.
         * @param {string} str - string value to be encoded
         */
        Utils.prototype.base64EncodeUnicode = function (str) {
            // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters,
            // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
            var utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function(match, p1) {
                    return String.fromCharCode('0x' + p1);
                });

            return btoa(utf8Bytes);
        };

        Utils.prototype.b64DecodeUnicode = function (str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        };

        Utils.prototype.retrieveEnvVariables = function () {
            var variableMap = {};
            var localVarObj = JSON.parse(localStorage.getItem("templatedAttributeList"));
            Object.keys(localVarObj).forEach(function(key, index, array) {
                var name = extractPlaceHolderName(key);
                if (localVarObj[key] !== undefined   && localVarObj[key] !== '') {
                    variableMap[name] = localVarObj[key];
                }
            });
            return variableMap;
        };

        function extractPlaceHolderName(name) {
            var textMatch = name.match("\\$\\{(.*?)\\}");
            if (textMatch) {
                return textMatch[1];
            } else {
                return '';
            }
        }

        return Utils;
    });
