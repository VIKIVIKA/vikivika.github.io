(function () {
    // namespace to group functions
    if (!window.pfCfActivators) {
        window.pfCfActivators = {};
    }

    // Declare each function if not already defined
    if (typeof window.pfCfActivators.activateChatComponent !== 'function') {

        const activateChatComponent = async (initConfig = {}) => {
            if (initConfig.isPreview || (window.location === window.parent.location)) {
                let apiHost = initConfig.apiHost ?? fetchFromEnv(window, 'apiHost', "https://jukebox.pathfactory.com");
                let apiPath = "api/public/v3";
                let clientId = initConfig.clientId ?? fetchFromEnv(window, 'clientId');
                let token = initConfig.token;
                let initWidgetType = initConfig.widgetType;

                // Default configuration
                const defaultConfig = {
                    "bubble": {
                        "type": "bubble",
                        "properties": {
                            is_published: true,
                            chat_position: 'fixed', // 'fixed', 'absolute', 'relative'
                            chat_valign: 'bottom', // 'top' or 'bottom'
                            chat_halign: 'right', // 'left', 'right', or 'center'
                            chat_margin: 20, // margin from edges
                            modal_valign: 'end', // 'end', 'start', 'center'
                            modal_halign: 'end', // 'end', 'start', 'center'
                            modal_margin: 0, // margin from edges
                            chat_info_halign: 'end', // 'normal', 'end', 'start', 'center'
                            cta_init_delay: 10,
                            cta_width: 60,
                            cta_height: 60,
                            cta_icon_type: 'img',
                            cta_icon: { url: '' },
                            cta_icon_size: 50,
                            cta_icon_height: 50,
                            cta_icon_color: '#000000',
                            cta_icon_stroke_color: '#000000',
                            cta_icon_stroke_width: 2,
                            cta_label: '',
                            cta_label_color: '#000000',
                            cta_label_size: 16,
                            cta_block_color: '#000000',
                            cta_block_place_holder_color: '#a0a0a0',
                            cta_button_spacing: 1, // space between icon and button
                            cta_container_background: '#ffffff',
                            cta_container_background_on_hover: '#d4d4d4',
                            cta_container_box_shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            cta_container_border_radius: 20, // rounded corners
                            cta_container_spacing: 1,
                            iframe_container_padding_bottom: 10, // aspect ratio for iframe ( Ratio [Padding (%)] ->  16:9 [56.25%], 4:3 [75%], 1:1 [100%], 21:9 [42.85%]
                            modal_content_width: 30,
                            modal_content_height: 85,
                            modal_backdrop_darkness_depth: 0,
                            modal_backdrop_filter_depth: 0,
                            callout_bgcolor: "#ffffff",
                            callout_margin: 10,
                            callout_action_width: 'auto',
                            callout_action_pointer: 'right',
                            cta_is_draggable: false,
                            cta_is_resizable: false,
                            cta_block_enable: false, // allow user to edit the cta block
                            callout_enable: true,
                            callout_hide_auto: true,
                            callout_action_enable: false,
                            modal_open_on_init: false,
                            modal_open_on_init_delay: 5,
                            callout_delay: 5,
                            callout_hide_delay: 10,
                            callout_char_limit: 30,
                            callout_message: "<div class=\"pf-rte-wrapper\"><p class=\"\">Need help? Click here to chat with us!.</p></div>",
                            callout_action_message: "Chat with our AI Agent",
                            cta_block_place_holder: 'Ask me anything...',
                            chat_custom_style_enable: false,
                            chat_custom_style: '',
                            chat_embed_target_id: '',
                            chat_embed_position: 'bottom', // 'top' or 'bottom'
                            chat_shield_background: '#00000000'
                        }
                    },
                    "search": {
                        "type": "search",
                        "properties": {
                            is_published: true,
                            chat_position: 'absolute', // 'fixed', 'absolute', 'relative'
                            chat_valign: 'bottom', // 'top' or 'bottom'
                            chat_halign: 'center', // 'left', 'right', or 'center'
                            chat_margin: 30, // margin from edges
                            modal_valign: 'end', // 'end', 'start', 'center'
                            modal_halign: 'center', // 'end', 'start', 'center'
                            modal_margin: 0, // margin from edges
                            chat_info_halign: 'end', // 'normal', 'end', 'start', 'center'
                            cta_init_delay: 10,
                            cta_width: 90,
                            cta_height: 60,
                            cta_icon_type: 'img',
                            cta_icon: { url: '' },
                            cta_icon_size: 50,
                            cta_icon_height: 50,
                            cta_icon_color: '#000000',
                            cta_icon_stroke_color: '#000000',
                            cta_icon_stroke_width: 2,
                            cta_label: 'Chat with AI',
                            cta_label_color: '#000000',
                            cta_label_size: 16,
                            cta_block_color: '#000000',
                            cta_block_place_holder_color: '#a0a0a0',
                            cta_button_spacing: 1, // space between icon and button
                            cta_container_background: '#ffffff',
                            cta_container_background_on_hover: '#d4d4d4',
                            cta_container_box_shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            cta_container_border_radius: 50, // rounded corners
                            cta_container_spacing: 1,
                            iframe_container_padding_bottom: 56, // aspect ratio for iframe ( Ratio [Padding (%)] ->  16:9 [56.25%], 4:3 [75%], 1:1 [100%], 21:9 [42.85%]
                            modal_content_width: 60,
                            modal_content_height: 80,
                            modal_backdrop_darkness_depth: 0,
                            modal_backdrop_filter_depth: 0,
                            callout_bgcolor: "#ffffff",
                            callout_margin: 10,
                            callout_action_width: 'auto',
                            callout_action_pointer: 'left',
                            cta_is_draggable: false,
                            cta_is_resizable: false,
                            cta_block_enable: true, // allow user to edit the cta block
                            callout_enable: false,
                            callout_hide_auto: true,
                            callout_action_enable: false,
                            modal_open_on_init: false,
                            modal_open_on_init_delay: 0,
                            callout_delay: 5,
                            callout_hide_delay: 10,
                            callout_char_limit: 30,
                            callout_message: "<div class=\"pf-rte-wrapper\"><p class=\"\">Need help? Chat with us!.</p></div>",
                            callout_action_message: "Chat with our AI Agent",
                            cta_block_place_holder: 'Ask me anything...',
                            chat_custom_style_enable: false,
                            chat_custom_style: '',
                            chat_embed_target_id: '',
                            chat_embed_position: 'bottom', // 'top' or 'bottom'
                            chat_shield_background: '#00000000'
                        }
                    }
                };

                await lookupConfig(apiHost, apiPath, clientId, token, initWidgetType).then(
                    function (widgetData) {
                        let cfWidgetOrigin = widgetData?.cf_widget?.origin ?? window.location.origin;
                        let origin = initConfig?.origin ?? fetchFromEnv(window, 'baseUrl', cfWidgetOrigin);
                        let isPreview = initConfig.isPreview;
                        let embedTarget = initConfig.embedTarget;
                        let embedPosition = initConfig.embedPosition;
                        let embedShieldBackground = initConfig.embedShieldBackground;
                        let widgetType = initConfig.widgetType || (widgetData?.cf_widget?.widget_type ?? 'bubble');
                        let componentType = widgetData?.cf_widget?.theme?.widgets?.[widgetType]?.type ?? 'bubble';
                        let cfContext = widgetData?.cf_widget?.chatfactory_context?.context ? `/aichat/${widgetData.cf_widget.chatfactory_context.context}` : '';
                        let agentStatus = widgetData?.cf_widget?.is_agent_available ?? false;
                        let agentSource = `${origin}${cfContext}?initiator=chat_widget&widget_token=${token}&widget_type=${widgetType}&activator=${componentType}&url=window.parent.location.href`;

                        const widgetConfig = {
                            apiHost: apiHost,
                            apiPath: apiPath,
                            clientId: clientId,
                            token: token,
                            origin: origin,
                            isPreview: isPreview,
                            widgetType: widgetType,
                            componentType: componentType,
                            embedTarget: embedTarget,
                            embedPosition: embedPosition,
                            embedShieldBackground: embedShieldBackground,
                            agentSource: agentSource,
                            cfContext: cfContext,
                            agentStatus: agentStatus,
                            defaultConfig: defaultConfig
                        };

                        let storedConfig = widgetData?.cf_widget?.theme?.widgets?.[widgetType] ?? {};
                        if (!initConfig.isPreview) {
                            checkAgentAvailabilityStatus(widgetConfig)
                                .then(flag => {
                                    flag ? buildChat(widgetConfig, storedConfig) : console.log(`${widgetConfig.widgetType} -> 'âš ï¸ Widget is not initialized as Agent is unavailable`);
                                })
                                .catch(e => {
                                    console.log(`${widgetConfig.widgetType} -> âš ï¸ Agent availability check failed`, e);
                                });
                        } else {
                            buildChat(widgetConfig, storedConfig);
                            window.addEventListener(
                                "message",
                                (event) => {
                                    if (event?.data?.type === 'event_theme') {
                                        console.log(`${widgetConfig.widgetType} -> Event Theme`, event.data.message);
                                        let widgetType = event.data?.message?.widgetType ?? event.data?.message?.widgets?.[0]?.widget_type;
                                        let editedConfig = event.data?.message?.widgets?.[widgetType] ?? {};

                                        buildChat(widgetConfig, editedConfig);
                                    } else if (event?.data?.type === 'event_combined_data') {
                                        console.log(`${widgetConfig.widgetType} -> Event Combined Data`, event.data.message);
                                    }
                                },
                                false
                            );
                        }
                    },
                    function (err) {
                        console.log(`${initConfig.widgetType} -> Chat lookupConfig fallback`, err);
                    }
                );
            }
        };

        const fetchFromEnv = (scope, key, defaultVal) => {
            try {
                return scope?.__PATHFACTORY__?.environment?.[key] ?? defaultVal;
            } catch (e) {
                return defaultVal;
            }
        }

        const checkCookieConsentStatus = (scope) => {
            try {
                const environment = scope?.__PATHFACTORY__ ? scope?.__PATHFACTORY__?.environment : (window?.__PATHFACTORY__?.environment ?? {});
                const consentStatus = scope?.pfConsentStatus?.() ?? (window?.pfConsentStatus?.() ?? (() => false));
                return environment?.gdprCookieConsentEnabled ? consentStatus : true;
            } catch (e) {
                console.log(`âš ï¸ Cookie consent check failed`, e);
                return true;
            }
        }

        const checkAgentAvailabilityStatus = async (widgetConfig, corsCheck = false) => {
            if (corsCheck) {
                return checkAgentAvailabilityInCORSCase(widgetConfig);
            } else {
                widgetConfig.agentStatus ? console.log(`${widgetConfig.widgetType} -> âœ… Agent is active (200)`) : console.log(`${widgetConfig.widgetType} -> âŒ Agent not active (404)`);
                return widgetConfig.agentStatus;
            }
        }

        const checkAgentAvailabilityInCORSCase = async (widgetConfig) => {
            let widgetType = widgetConfig.widgetType;
            let url = widgetConfig.agentSource;
            let containerId = `chatAgentCheckShield-${widgetConfig.token}-${widgetConfig.widgetType}`;
            try {
                const response = await fetch(url, { method: 'HEAD' }); // just gets headers
                if (response.status === 200) {
                    console.log(`${widgetType} -> âœ… Agent is active (200)`);
                    return true;
                } else if (response.status === 404) {
                    console.log(`${widgetType} -> âŒ Agent not found (404)`);
                    return false;
                } else {
                    console.log(`${widgetType} -> â„¹ï¸ Agent returned status: ${response.status}`);
                    return false;
                }
            } catch (error) {
                console.error(`${widgetType} -> ðŸš« Error checking Agent:`, error);
                const response = await checkAgentUrlIsLoading(url, containerId);
                console.log(`${widgetType} -> checkAgentUrlIsLoading`, response);
                return response;
            }
        }

        const checkAgentUrlIsLoading = async (url, containerId) => {
            try {
                return new Promise(resolve => {
                    const chatAgentCheckShield = document.createElement('iframe');
                    chatAgentCheckShield.id = containerId;
                    chatAgentCheckShield.style.display = 'none';
                    chatAgentCheckShield.src = url;

                    chatAgentCheckShield.onload = () => resolve(true);    // loaded successfully
                    chatAgentCheckShield.onerror = () => resolve(false);  // failed (404 or blocked)

                    document.body.appendChild(chatAgentCheckShield);
                });
            } catch (e) {
                return true;
            }
        }

        const lookupConfig = (apiHost, apiPath, clientId, token, widgetType) =>
            new Promise((resolve, reject) => {
                const xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = () => {
                    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                            if (resolve) {
                                resolve(JSON.parse(xmlhttp.responseText));
                            }
                        } else {
                            if (reject) {
                                reject(new Error("something went wrong"));
                            }
                        }
                    }
                };

                xmlhttp.open("GET", `${apiHost}/${apiPath}/cf_headless/widget?client_id=${clientId}&token=${token}&widget_type=${widgetType}`, true);
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.setRequestHeader("Accept", "application/json");
                xmlhttp.withCredentials = true;
                xmlhttp.send();
            });

        const deepMerge = (target, source) => {
            const result = { ...target };
            for (const key in source) {
                if (source[key] instanceof Object && key in target) {
                    result[key] = deepMerge(target[key], source[key]);
                } else {
                    result[key] = source[key];
                }
            }
            return result;
        };

        const isDraftModeActive = (token, widgetType) => {
            const itemStr = localStorage.getItem(`cf_activation_draft_${token}_${widgetType}`);
            // if the item doesn't exist, return false
            if (!itemStr) {
                return false;
            }
            const item = JSON.parse(itemStr);
            const now = Date.now();
            // compare the expiry time of the item with the current time
            if (now > item.expiry) {
                // If the item is expired, delete the item from storage
                // and return false
                localStorage.removeItem(`cf_activation_draft_${token}_${widgetType}`);
                return false;
            }
            return true;
        };

        const svgFileToString = async (iconpath, key) => {
            try {
                let iconToFetch = iconpath?.url?.toLowerCase().endsWith('svg') ? iconpath.url : '';
                if (iconToFetch.length === 0) {
                    return '';
                }
                const response = await fetch(iconToFetch);
                const svg = await response.text();
                return svg;
            } catch (error) {
                console.log('Error:', error);
                new Promise((resolve, reject) => {
                    resolve('');
                });
            }
        }

        const formatConfig = (customConfig) => {
            return customConfig;
        };

        const buildChat = async (widgetConfig, customConfig) => {
            let targetAvailabilityCheckTry = 0; 
            const defaultConfig = widgetConfig.defaultConfig;
            const formatedConfig = formatConfig(customConfig);
            const targetConfig = defaultConfig?.[widgetConfig.componentType] ?? {};

            // Merge user config with default config
            const config = deepMerge(targetConfig, formatedConfig);

            const cta_icon_default_svg = `<svg id="pf-cf-cta-icon" fill="#000000" height="24px" width="24px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M12,17c0.8-4.2,1.9-5.3,6.1-6.1c0.5-0.1,0.8-0.5,0.8-1s-0.3-0.9-0.8-1C13.9,8.1,12.8,7,12,2.8C11.9,2.3,11.5,2,11,2 c-0.5,0-0.9,0.3-1,0.8C9.2,7,8.1,8.1,3.9,8.9C3.5,9,3.1,9.4,3.1,9.9s0.3,0.9,0.8,1c4.2,0.8,5.3,1.9,6.1,6.1c0.1,0.5,0.5,0.8,1,0.8 S11.9,17.4,12,17z"></path> <path d="M22,24c-2.8-0.6-3.4-1.2-4-4c-0.1-0.5-0.5-0.8-1-0.8s-0.9,0.3-1,0.8c-0.6,2.8-1.2,3.4-4,4c-0.5,0.1-0.8,0.5-0.8,1 s0.3,0.9,0.8,1c2.8,0.6,3.4,1.2,4,4c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c0.6-2.8,1.2-3.4,4-4c0.5-0.1,0.8-0.5,0.8-1 S22.4,24.1,22,24z"></path> <path d="M29.2,14c-2.2-0.4-2.7-0.9-3.1-3.1c-0.1-0.5-0.5-0.8-1-0.8c-0.5,0-0.9,0.3-1,0.8c-0.4,2.2-0.9,2.7-3.1,3.1 c-0.5,0.1-0.8,0.5-0.8,1s0.3,0.9,0.8,1c2.2,0.4,2.7,0.9,3.1,3.1c0.1,0.5,0.5,0.8,1,0.8c0.5,0,0.9-0.3,1-0.8 c0.4-2.2,0.9-2.7,3.1-3.1c0.5-0.1,0.8-0.5,0.8-1S29.7,14.1,29.2,14z"></path> </g> </g></svg>`;
            
            let cta_icon_svg = config.properties.cta_icon_type === 'svg' ? await svgFileToString(config.properties.cta_icon) : '';
            cta_icon_svg = cta_icon_svg?.replace('<svg', '<svg id="pf-cf-cta-icon"');

            let cta_icon_img = config.properties.cta_icon_type === 'img' && config.properties.cta_icon.url ? `<div class="pf-cf-cta-img-container"><img class="pf-cf-cta-img" src="${config.properties.cta_icon.url}" /></div>` : '';
            
            const chatShieldTargetID = `chatShieldTarget-${widgetConfig.token}-${widgetConfig.widgetType}`;
            const chatShieldHostID = `chatShieldHost-${widgetConfig.token}-${widgetConfig.widgetType}`;
            const chatShieldID = `chatShield-${widgetConfig.token}-${widgetConfig.widgetType}`;
            const chatModalShieldID = `chatModalShield-${widgetConfig.token}-${widgetConfig.widgetType}`;
            const chatStyleShieldID = `chatStyleShield-${widgetConfig.token}-${widgetConfig.widgetType}`;
            const chatAgentCheckShieldID = `chatAgentCheckShield-${widgetConfig.token}-${widgetConfig.widgetType}`;

            const chatShieldClass = `.${chatShieldID}`;
            const chatModalShieldClass = `.${chatModalShieldID}`;

            // Create and inject CSS
            const styles = `
                /* Chat Shield Host container */
                ${chatShieldClass} {
                    background-color: ${widgetConfig.embedShieldBackground || config.properties.chat_shield_background || '#00000000'};
                }

                /* Chat container */
                ${chatShieldClass} .pf-cf-chat-container {
                    position: ${config.properties.chat_position};
                    ${config.properties.chat_valign}: ${config.properties.chat_margin}px;
                    ${config.properties.chat_halign === 'center' ?
                    'left: 50%; transform: translateX(-50%);' :
                    `${config.properties.chat_halign}: ${config.properties.chat_margin}px;`
                }
                    z-index: 2147483646;
                    background: transparent;
                    ${config.properties.cta_block_enable ?
                    `width: ${config.properties.cta_width}%;` : ''
                }
                    max-width: 95%;
                    display: flex;
                    flex-direction: column${config.properties.chat_valign === 'top' ? '-reverse' : ''};
                    align-items: ${config.properties.chat_halign === 'right' ? 'end' : 'start'};
                }

                /* Chat cta container */
                ${chatShieldClass} .pf-cf-cta-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    float: ${config.properties.chat_halign === 'center' ?
                    'none' : config.properties.chat_halign
                };
                    background: ${config.properties.cta_container_background};
                    backdrop-filter: blur(5px);
                    border-radius: ${config.properties.cta_container_border_radius}${config.type === 'bubble' ? '%' : 'px'};
                    padding: 0px ${config.properties.cta_container_spacing || 0}px;
                    box-shadow: ${config.properties.cta_container_box_shadow};
                    width: ${!config.properties.cta_block_enable ? (config.properties.cta_width > 0 ? config.properties.cta_width + 'px' : 'auto') : 100 + '%'};
                    height: ${config.properties.cta_height}px;
                    transition: all 0.3s ease-in-out;
                    z-index: 2147483646;
                }

                ${chatShieldClass} .pf-cf-cta-container:hover {
                    background: ${config.properties.cta_container_background_on_hover};
                }

                /* Chat cta block styling */
                ${chatShieldClass} .pf-cf-cta-block {
                    padding: ${config.properties.cta_block_enable ? '12px' : '0px'};
                    border: none;
                    border-radius: 25px;
                    outline: none;
                    font-size: 16px;
                    width: calc(100% - 40px);
                    background: transparent;
                    color: ${config.properties.cta_block_color || '#000000'};
                    display: ${config.properties.cta_block_enable ? 'block' : 'none'};
                }

                /* Chat cta block placeholder */
                ${chatShieldClass} .pf-cf-cta-block::placeholder {
                    color: ${config.properties.cta_block_place_holder_color || '#a0a0a0'};
                    opacity: 1;  /* Optional: ensures full visibility in some browsers */
                }

                /* Chat cta label */
                ${chatShieldClass} .pf-cf-cta-label {
                    color: ${config.properties.cta_label_color || '#000000'};
                    font-size: ${config.properties.cta_label_size || 16}px;
                    margin-right: ${config.properties.cta_button_spacing || 1}px;
                    cursor: pointer;
                    display: ${config.properties.cta_block_enable ? 'none' : 'block'};
                }

                /* cta button */
                ${chatShieldClass} .pf-cf-cta-btn {
                    margin-left: ${config.properties.cta_button_spacing || 1}px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 5px;
                    display: contents;
                    align-items: center;
                    float: right;
                }

                ${chatShieldClass} #pf-cf-cta-icon {
                    width: ${config.properties.cta_icon_size || 50}px;
                    height: ${config.properties.cta_icon_height || config.properties.cta_icon_size}px;
                    fill: ${config.properties.cta_icon_color || '#000000'};   /* fill color */
                    stroke: ${config.properties.cta_icon_stroke_color || '#000000'};   /* stroke color */
                    stroke-width: ${config.properties.cta_icon_stroke_width || 2};
                    transition: fill 0.3s;
                    cursor: pointer;
                }

                ${chatShieldClass} #pf-cf-cta-icon:hover {
                    fill: ${config.properties.cta_icon_color || '#000000'};   /* hover effect */
                }

                ${chatShieldClass} .pf-cf-cta-img-container {
                    width: ${(config.properties.cta_icon_size || 50) + 1}px;
                    height: ${(config.properties.cta_icon_height || config.properties.cta_icon_size) + 1}px;
                    overflow: hidden;
                }

                ${chatShieldClass} .pf-cf-cta-img {
                    width: ${config.properties.cta_icon_size || 50}px;
                    height: ${config.properties.cta_icon_height || config.properties.cta_icon_size}px;
                    object-fit: cover;
                    border-radius: ${config.properties.cta_container_border_radius}${config.type === 'bubble' ? '%' : 'px'};
                    padding: ${config.properties.cta_container_spacing || 0}px;
                    transition: fill 0.3s;
                    cursor: pointer;
                }

                ${chatShieldClass} .pf-cf-chat-info-box {
                    display: none;
                    flex-direction: column${config.properties.chat_valign === 'top' ? '-reverse' : ''};
                    align-items: ${config.properties.chat_info_halign || 'normal'};
                }
                
                ${chatShieldClass} .pf-cf-chat-promo-box-action {
                    display: ${config.properties.callout_action_enable ? 'block' : 'none'};
                    width: ${config.properties.callout_action_width || 'auto'};
                }

                /* https://css-generators.com/tooltip-speech-bubble/ */
                /* HTML: <div class="tooltip">This is a Tooltip with a gradient or solid coloration and with border radius </div> */
                ${chatShieldClass} #pfCfChatInfoBox .tooltip-action {
                    background: ${config.properties.cta_container_background};
                    border-radius: 12px;
                    padding: 8px;
                    color: ${config.properties.cta_label_color || '#000000'};
                    margin-${config.properties.chat_valign}: ${config.properties.callout_margin || 10}px;
                    text-align: center;
                    cursor: pointer;
                    box-shadow: rgba(0, 77, 255, 0.5) 0 4px 24px;
                }  
                ${chatShieldClass} #pfCfChatInfoBox .tooltip {
                    max-width: ${config.properties.callout_char_limit || 30}ch;
                    background: ${config.properties.callout_bgcolor};
                    margin-${config.properties.chat_valign}: ${config.properties.callout_margin || 10}px;
                    box-shadow: rgba(0, 77, 255, 0.5) 0 4px 24px;
                }
                ${chatShieldClass} #pfCfChatInfoBox .tooltip {
                    --s: 2em; /* triangle size */
                    --r: 2em; /* the radius */

                    padding: 1em;
                    border: 2px solid #ddd;
                    border-radius: calc(var(--r) + var(--s));
                    border-${config.properties.chat_valign}-${config.properties.callout_action_pointer || 'right'}-radius: 0;
                }

                ${chatShieldClass} .pf-cf-cta-expand-icon {
                    display: ${config.properties.cta_block_enable ? 'block' : 'none'};
                    position: absolute;
                    ${config.properties.chat_valign === 'top' && config.properties.chat_margin <= 30 ? 'bottom' : 'top'}: -40px;
                    right: 10px;
                    font-size: 18px;
                    cursor: pointer;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    background-color: #FFFFFF;
                    padding: 2px 10px;
                    border-radius: 5px;
                    border: 1px solid ${config.properties.cta_block_place_holder_color};
                    color: ${config.properties.cta_block_place_holder_color};
                }

                ${chatShieldClass} .pf-cf-chat-container:hover .pf-cf-cta-expand-icon {
                    opacity: 1;
                }

                ${chatShieldClass} .pf-cf-mode-tag {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    /* background: rgba(0, 0, 0, 0.1); */
                    color: rgba(0, 0, 0, 0.2);
                    padding: 5px 10px;
                    font-size: 15px;
                    /* font-weight: bold; */
                    transform: rotate(90deg);
                    transform-origin: top right;
                    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); */
                    box-shadow: 0 2px 5px #a6d5fa;
                    border-radius: 10%;
                    /* border: 1px solid; */
                }

                /* Modal styles */
                ${chatModalShieldClass} .pf-cf-modal {
                    position: fixed;
                    ${config.properties.modal_halign !== 'center' ?
                    `
                        ${config.properties.modal_halign === 'end' ? 'right' : 'left'}: ${config.properties.modal_margin}px;
                        ` :
                    ''
                }
                    ${config.properties.modal_valign !== 'center' ?
                    `
                        ${config.properties.modal_valign === 'end' ? 'bottom' : 'top'}: ${config.properties.modal_margin}px;
                        ` :
                    ''
                }
                    // top: 0;
                    // left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, ${(config.properties.modal_backdrop_darkness_depth * 0.1) || 0});
                    display: none;
                    justify-content: ${config.properties.modal_halign || 'center'};
                    align-items: ${config.properties.modal_valign || 'center'};
                    transition: opacity 0.3s ease-in-out;
                    opacity: 0;
                    backdrop-filter: blur(${config.properties.modal_backdrop_filter_depth || 0}px);
                    z-index: 2147483647;
                }

                /* Modal content styling - 1 */
                ${chatModalShieldClass} .pf-cf-modal-content {
                    z-index: 2147483647;
                    background-color: white;
                    border-radius: 20px;
                    min-width: 400px;
                    width: ${config.properties.modal_content_width || 30}%;
                    height: ${config.properties.modal_content_height || 80}vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    transform: scale(0);
                    transition: transform 0.5s ease, opacity 0.3s ease;
                    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.5);
                    background: linear-gradient(145deg, #e0e0e0, #ffffff);
                }

                /* Modal content styling - 2 */
                /* 
                ${chatModalShieldClass} .pf-cf-modal-content {
                    position: relative;
                    background-color: white;
                    border-radius: 20px;
                    min-width: 400px;
                    width: ${config.properties.modal_content_width || 30}%;
                    height: ${config.properties.modal_content_height || 80}vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    transform: translateY(100vh); /* Start off-screen at bottom */
                    transition: transform 0.4s ease-out, opacity 0.3s ease;
                    opacity: 0;
                    z-index: 2147483647;
                }

                ${chatModalShieldClass} .pf-cf-modal.show .pf-cf-modal-content {
                    transform: translateY(0); /* Slide into view */
                    opacity: 1;
                }

                */
                
                /* Iframe container */
                ${chatModalShieldClass} .pf-cf-iframe-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    padding-bottom: ${config.properties.iframe_container_padding_bottom || 56}%;
                    background: #000;
                    border-radius: 10px;
                    margin-bottom: 0;
                    display: block;
                }

                /* Iframe styling */
                ${chatModalShieldClass} .pf-cf-iframe-container iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    transition: opacity 0.3s ease-in-out;
                }

                /* Spinner styling */
                ${chatModalShieldClass} .pf-cf-spinner {
                    display: none;
                    width: 50px;
                    height: 50px;
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin: -25px 0 0 -25px;
                    transition: opacity 0.3s ease-in-out;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                ${chatModalShieldClass} .pf-cf-spinner-fade-out {
                    opacity: 0 !important;
                }

                /* Close button styling */
                ${chatModalShieldClass} .pf-cf-modal-close-btn {
                    position: absolute;
                    top: -15px;
                    right: 10px;
                    width: 15px;
                    height: 15px;
                    // border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    z-index: 2147483647;
                }

                ${chatModalShieldClass} .pf-cf-modal-close-btn:hover {
                    background: rgba(255, 255, 255, 1);
                    transform: scale(1.1);
                }

                ${chatModalShieldClass} .pf-cf-modal-close-btn::before,
                ${chatModalShieldClass} .pf-cf-modal-close-btn::after {
                    content: '';
                    position: absolute;
                    width: 12px;
                    height: 2px;
                    background-color: #333;
                    transition: all 0.3s ease;
                }

                ${chatModalShieldClass} .pf-cf-modal-close-btn::before {
                    transform: rotate(45deg);
                }

                ${chatModalShieldClass} .pf-cf-modal-close-btn::after {
                    transform: rotate(-45deg);
                }

                ${chatModalShieldClass} .pf-cf-modal-close-btn:hover::before,
                ${chatModalShieldClass} .pf-cf-modal-close-btn:hover::after {
                    background-color: #000;
                }
            
                @media (max-width: 767px) {
                    ${chatShieldClass} .pf-cf-chat-container {
                        ${config.properties.cta_block_enable && config.properties.chat_halign !== 'center' ?
                    `
                            left: 10px; 
                            right: 10px; 
                            width: 100%;
                            ` : `
                            width: 100%;
                            `
                }            
                    }

                    ${chatModalShieldClass} .pf-cf-modal {
                        top: 0;
                        left: 0;
                    }

                    ${chatModalShieldClass} .pf-cf-modal-content {
                        width: 100% !important;
                        height: 100% !important;
                    }

                    ${chatModalShieldClass} .pf-cf-modal-close-btn {
                        top: 5px;
                        right: 5px;
                    }

                }

                /* Chat custom styles */
                ${config.properties.chat_custom_style_enable ? config.properties.chat_custom_style : ''}
            `;

            // Create and inject HTML
            const html = `
                <section class="pf-cf-chat-container" id="pfCfChatContainer">
                    <div class="pf-cf-chat-info-box" id="pfCfChatInfoBox">
                        <div id="pfCfChatPromoBox" class="pf-cf-chat-promo-box tooltip">
                            ${config.properties.callout_message}
                        </div>
                        <div id="pfCfChatPromoBoxAction" class="pf-cf-chat-promo-box-action tooltip-action">${config.properties.callout_action_message}</div>
                    </div>
                    <div class="pf-cf-cta-container" id="ctaContainer">
                        ${isDraftModeActive(widgetConfig.token, widgetConfig.widgetType) ? `<div class="pf-cf-mode-tag">Draft Mode</div>` : ''}
                        <input type="text" class="pf-cf-cta-block" placeholder="${config.properties.cta_block_place_holder}" id="pfCfCtaBlock">
                        <div class="pf-cf-cta-btn" id="pfCfCtaBtn">
                            <div class="pf-cf-cta-label" id="pfCfCtaLabel">${config.properties.cta_label}</div>
                            ${config.properties.cta_icon_type === 'svg' ?
                    (
                        cta_icon_svg || cta_icon_default_svg
                    ) :
                    (
                        cta_icon_img || cta_icon_default_svg
                    )
                }
                        </div>
                    </div>
                    <button class="pf-cf-cta-expand-icon">â¤¢</button>
                </section>
            `;

            // Inject modal separately from chat container
            const modalHTML = `
                <div class="pf-cf-modal" id="modal">
                    <div class="pf-cf-modal-content" id="modalContent">
                        <button class="pf-cf-modal-close-btn" id="pfCfModalCloseBtn"></button>
                        <div class="pf-cf-spinner" id="pfCfSpinner"></div>
                        <div class="pf-cf-iframe-container" id="pfCfIframeContainer">
                            <iframe id="pfCfIframe" src="widget.agentSource" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            `;

            // Ensure DOM is loaded before initializing
            function init() {
                const chatPlacementMode = config.properties.chat_position || 'absolute';
                const embedPosition = widgetConfig.embedPosition || config.properties.chat_embed_position;
                let targetElementId = widgetConfig.embedTarget || config.properties.chat_embed_target_id;

                try {
                    const chatShieldTarget = document.getElementById(chatShieldTargetID);
                    const chatShieldHost = document.getElementById(chatShieldHostID);
                    const chatShield = document.getElementById(chatShieldID);
                    const chatModalShield = document.getElementById(chatModalShieldID);
                    const chatStyleShield = document.getElementById(chatStyleShieldID);
                    const chatAgentCheckShield = document.getElementById(chatAgentCheckShieldID);

                    if (chatShieldTarget) chatShieldTarget.remove();
                    if (chatShieldHost) chatShieldHost.remove();
                    if (chatModalShield) chatModalShield.remove();
                    if (chatShield) chatShield.remove();
                    if (chatStyleShield) chatStyleShield.remove();
                    if (chatAgentCheckShield) chatAgentCheckShield.remove();

                } catch (e) {
                    console.log(`${widgetConfig.widgetType} -> Error removing chat shields:`, e);
                }

                if (!widgetConfig.isPreview && !config.properties.is_published && !isDraftModeActive(widgetConfig.token, widgetConfig.widgetType)) return;

                if (config.properties.is_published) {
                    localStorage.removeItem(`cf_activation_draft_${widgetConfig.token}_${widgetConfig.widgetType}`);
                }

                if (chatPlacementMode === 'relative' && widgetConfig.isPreview) {
                    // Inject dummy embed target html for preview mode separately
                    targetElementId = targetElementId || "previewTargetElementId";
                    const dummyEmbedTargetHtml = `
                        <div style="position: relative; width: 100%; padding: 50px 0px; background-color: #f1f3f5; text-align: center;" id="${targetElementId}">
                            Target Element for preview
                        </div>
                    `;

                    // Create dummy embed target section and append HTML
                    const dummyEmbedTarget = document.createElement('div');
                    dummyEmbedTarget.id = chatShieldTargetID;
                    dummyEmbedTarget.innerHTML = dummyEmbedTargetHtml;
                    document.body.appendChild(dummyEmbedTarget);
                }

                // Check for target availability before embedding
                const targetElement = document.getElementById(targetElementId);
                if (chatPlacementMode === 'relative' && !targetElement && targetAvailabilityCheckTry < 3) {
                    targetAvailabilityCheckTry++;
                    setTimeout(init, 1000); // Retry after 1 second
                    return;
                }
    
                if (!targetElement) {
                    console.warn(`Element with id "${targetElementId}" not found.`);
                    
                    // Create style element and append CSS
                    const styleSheet = document.createElement('style');
                    styleSheet.id = chatStyleShieldID;
                    styleSheet.textContent = styles;
                    document.head.appendChild(styleSheet);

                    // Create container and append HTML
                    const container = document.createElement('div');
                    container.id = chatShieldID;
                    container.classList.add(chatShieldID);
                    container.innerHTML = html;
                    document.body.appendChild(container);

                    // Append modal to body
                    const modalWrapper = document.createElement('div');
                    modalWrapper.id = chatModalShieldID;
                    modalWrapper.classList.add(chatModalShieldID);
                    modalWrapper.innerHTML = modalHTML;
                    document.body.appendChild(modalWrapper);

                } else {
                    if (document.getElementById(chatShieldHostID)) {
                        console.log('Chat Shield Host already injected. Skipping duplicate.');
                    } else {
                        // Create container and insert it right after the target element
                        const chatShieldHost = document.createElement('div');
                        chatShieldHost.id = chatShieldHostID;
                        chatShieldHost.classList.add(chatShieldHostID);
                        targetElement.parentNode.insertBefore(chatShieldHost, embedPosition === 'top' ? targetElement : targetElement.nextSibling);

                        // Attach a Shadow DOM to isolate styles
                        const chatShieldHostShadowRoot = chatShieldHost.attachShadow({ mode: 'open' });

                        const containerStyle = `
                            <style id="${chatStyleShieldID}">${styles}</style>
                        `;
                        const containerHTML = `
                            <div id="${chatShieldID}" class="${chatShieldID}">
                                ${html}
                            </div>
                        `;
                        const containerModalHTML = `
                            <div id="${chatModalShieldID}" class="${chatModalShieldID}">
                                ${modalHTML}
                            </div>
                        `;
                        // Step 5: Inject into the shadow root
                        chatShieldHostShadowRoot.innerHTML = containerStyle + containerHTML + containerModalHTML;
                    }
                }

                // Initialize functionality
                const chatShieldHost = targetElementId ? document.getElementById(chatShieldHostID) : null;
                const chatShieldHostShadowRoot = chatShieldHost ? chatShieldHost.shadowRoot : null;
                const chatShieldContainer = !targetElementId ? document.getElementById(chatShieldID) : chatShieldHostShadowRoot.getElementById(chatShieldID);
                const chatModalShieldContainer = !targetElementId ? document.getElementById(chatModalShieldID) : chatShieldHostShadowRoot.getElementById(chatModalShieldID);
                const chatContainer = chatShieldContainer.querySelector('#pfCfChatContainer');
                const ctaContainer = chatShieldContainer.querySelector('.pf-cf-cta-container');
                const ctaExpandIcon = chatShieldContainer.querySelector('.pf-cf-cta-expand-icon');
                const ctaBtn = chatShieldContainer.querySelector('#pfCfCtaBtn');
                const cta_label = chatShieldContainer.querySelector('#pfCfCtaLabel');
                const ctaBlock = chatShieldContainer.querySelector('#pfCfCtaBlock');
                const chatInfoBox = chatShieldContainer.querySelector('#pfCfChatInfoBox');
                const chatPromoBox = chatShieldContainer.querySelector('#pfCfChatPromoBox');
                const chatPromoBoxAction = chatShieldContainer.querySelector('#pfCfChatPromoBoxAction');
                const modal = chatModalShieldContainer.querySelector('#modal');
                const modalContent = chatModalShieldContainer.querySelector('.pf-cf-modal-content');
                const modalCloseBtn = chatModalShieldContainer.querySelector('#pfCfModalCloseBtn');
                const spinner = chatModalShieldContainer.querySelector('#pfCfSpinner');
                const iframeContainer = chatModalShieldContainer.querySelector('#pfCfIframeContainer');
                const iframe = chatModalShieldContainer.querySelector('#pfCfIframe');

                let isModalInitialized = false;
                let isModalInOpenState = false;

                // Event listeners
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                        closeModal();
                        event.preventDefault();
                    }
                });

                if (!config.properties.cta_block_enable) {
                    ctaContainer.addEventListener('click', openModal);
                }

                ctaExpandIcon.addEventListener('click', openModal);
                cta_label.addEventListener('click', openModal);
                chatPromoBox.addEventListener('click', hideCallout);
                chatPromoBoxAction.addEventListener('click', openModal);

                ctaBtn.addEventListener('click', openAgent);
                ctaBlock.addEventListener('keydown', async (event) => {
                    if (event.key === 'Enter') {
                        openAgent();
                        event.preventDefault();
                    }
                });

                modal.addEventListener('click', (event) => {
                    if (!modalContent.contains(event.target)) {
                        closeModal();
                    }
                });

                modalCloseBtn.addEventListener('click', closeModal);

                // Call showCallout when the page loads
                // window.addEventListener('load', showCallout);
                // window.addEventListener('focus', showCallout);
                // window.addEventListener('blur', hideCallout);

                function openAgent() {
                    try {
                        waitForAgentWorker((containerRefreshed) => {
                            let agentWorker = iframe?.contentWindow?.AgentWorker;
                            agentWorker ? console.log(`${widgetConfig.widgetType} -> AgentWorker is available.`) : console.log(`${widgetConfig.widgetType} -> AgentWorker is not available.`);
                            let query = ctaBlock?.value?.trim();
                            let payload = { query, token: widgetConfig.token };
                            console.log(`${widgetConfig.widgetType} -> AgentWorker OpenAgent Payload:`, payload);
                            agentWorker?.openAgent(payload);
                            ctaBlock.value = '';
                        });
                    } catch (error) {
                        console.log(`${widgetConfig.widgetType} -> Error accessing AgentWorker.`, error);
                        try {
                            let query = ctaBlock?.value?.trim();
                            let payload = { query, token: widgetConfig.token };
                            console.log(`${widgetConfig.widgetType} -> AgentWorker OpenAgent Payload Post Message:`, payload);
                            const postMessagePayload = {type: 'cfOpenAgent', payload: payload};
                            iframe.contentWindow?.postMessage(JSON.stringify(postMessagePayload), iframe.src);
                            ctaBlock.value = '';
                        } catch (e) {
                            console.error(`${widgetConfig.widgetType} -> Error posting message to iframe:`, e);
                        }
                    }
                    openModal();
                }

                // wait for AgentWorker available
                function waitForAgentWorker(callback, timeout = widgetConfig.isPreview ? 2000 : 10000, interval = 1000) {
                    const startTime = Date.now();
                    let containerRefreshed = false;
                    try {
                        let pfConsent = checkCookieConsentStatus(iframe?.contentWindow);
                        if (iframe.src.includes('widget.agentSource') || !pfConsent) {
                            console.log(`${widgetConfig.widgetType} -> ` + (!pfConsent ? 'pfConsent not available and the ' : '') + 'container is auto refreshed to initialize frame source');
                            iframe.src = widgetConfig.agentSource;
                            containerRefreshed = true;
                        }
                    } catch (e) {
                        console.log(`${widgetConfig.widgetType} -> Error refreshing container:`, e);
                    }

                    const checkForResource = () => {
                        try {
                            let runningTime = Date.now() - startTime;
                            const agentWorker = iframe?.contentWindow?.AgentWorker;
                            if (agentWorker) {
                                setTimeout(() => callback(containerRefreshed), containerRefreshed ? (widgetConfig.isPreview ? 0 : 5000) : 0);
                            } else if (runningTime < timeout) {
                                setTimeout(checkForResource, interval);
                            } else {
                                console.error(`${widgetConfig.widgetType} -> AgentWorker not identified in container within timeout.`);
                                callback(false);
                            }
                        } catch (e) {
                            console.log(`${widgetConfig.widgetType} -> Error checking for AgentWorker:`, e);
                            callback(false);
                        }
                    };
                    checkForResource();
                }

                /* Modal content styling - 1 */
                async function openModal() {
                    isModalInitialized = true;
                    isModalInOpenState = true;

                    waitForAgentWorker((containerRefreshed) => {
                        containerRefreshed ? console.log(`${widgetConfig.widgetType} -> Container Refreshed.`) : console.log(`${widgetConfig.widgetType} -> Container Refresh Not detected.`);
                    });

                    modal.style.display = 'flex';
                    setTimeout(() => {
                        modal.style.opacity = '1';
                        modalContent.style.transform = 'scale(1)';
                    }, 10);

                    ctaContainer.style.transform = 'scale(0)';
                    ctaContainer.style.opacity = '0';
                    ctaBlock.blur();

                    hideCallout();

                    spinner.classList.remove('pf-cf-spinner-fade-out');
                    spinner.style.opacity = '1';
                    spinner.style.display = 'block';
                    iframeContainer.style.display = 'none';
                    iframe.style.opacity = '0';

                    setTimeout(() => {
                        spinner.classList.add('pf-cf-spinner-fade-out');
                    }, 1000);

                    setTimeout(() => {
                        spinner.style.display = 'none';
                        iframeContainer.style.display = 'block';
                        iframe.style.opacity = '1';
                    }, 1500);
                }

                function closeModal() {
                    isModalInOpenState = false;
                    modal.style.opacity = '0';
                    modalContent.style.transform = 'scale(0)';

                    setTimeout(() => {
                        modal.style.display = 'none';
                        ctaContainer.style.transform = 'scale(1)';
                        ctaContainer.style.opacity = '1';
                    }, 300);
                }

                function showCta() {
                    // Show the cta after a delay
                    if (!chatShieldContainer) return;
                    chatShieldContainer.style.opacity = '0';
                    chatShieldContainer.style.display = 'none';

                    let startTime = Date.now();
                    let runningTime = Date.now();
                    let delayCtaTime = (widgetConfig.isPreview ? 0 : config.properties.cta_init_delay) * 1000;

                    try {
                        waitForAgentWorker((containerRefreshed) => {
                            containerRefreshed ? console.log(`${widgetConfig.widgetType} -> Env ready to initialize widget.`) : console.log(`${widgetConfig.widgetType} -> Env not ready yet but initializing widget.`);
                            runningTime = Date.now() - startTime;
                            setTimeout(() => {
                                chatShieldContainer.style.display = 'flex';
                                chatShieldContainer.style.opacity = '1';
                                chatShieldContainer.style.transition = 'opacity 0.3s ease-in-out';

                                showCallout();
                                showModal();
                                makeChatBubbleDraggable('pfCfChatContainer', config.properties.chat_draggable);
                            }, (delayCtaTime > runningTime ? delayCtaTime - runningTime : 0));
                        });
                    } catch (error) {
                        console.log(`${widgetConfig.widgetType} -> Error accessing AgentWorker. Env not ready yet but initializing widget.`, error);
                        runningTime = Date.now() - startTime;
                        setTimeout(() => {
                            chatShieldContainer.style.display = 'flex';
                            chatShieldContainer.style.opacity = '1';
                            chatShieldContainer.style.transition = 'opacity 0.3s ease-in-out';

                            showCallout();
                            showModal();
                            makeChatBubbleDraggable('pfCfChatContainer', config.properties.chat_draggable);
                        }, (delayCtaTime > runningTime ? delayCtaTime - runningTime : 0));
                    }
                }

                function showCallout() {
                    if (isModalInitialized || !chatInfoBox || !config.properties.callout_enable) return;

                    // Show the callout after a delay
                    setTimeout(() => {
                        if (isModalInitialized) return;

                        // const rect = ctaContainer.getBoundingClientRect();
                        // chatInfoBox.style.left = `${rect.left + window.scrollX}px`;
                        // chatInfoBox.style.top = `${rect.bottom + 8 + window.scrollY}px`; // 8px offset

                        chatInfoBox.style.display = 'flex';
                        chatInfoBox.style.opacity = '1';
                        chatInfoBox.style.transition = 'opacity 0.3s ease-in-out';

                        // Auto-hide if enabled
                        if (config.properties.callout_hide_auto) {
                            setTimeout(() => {
                                hideCallout();
                            }, (config.properties.callout_hide_delay || 10) * 1000);
                        }
                    }, (config.properties.callout_delay || 5) * 1000);
                }

                function hideCallout() {
                    if (!chatInfoBox) return;

                    chatInfoBox.style.opacity = '0';
                    setTimeout(() => {
                        chatInfoBox.style.display = 'none';
                    }, 300); // wait for pf-cf-spinner-fade-out
                }

                function showModal() {
                    if (widgetConfig.isPreview || !config.properties.modal_open_on_init) return;

                    // Show the Modal after a delay
                    let chatBoxInitDelayTimer = setTimeout(() => {
                        if (!isModalInitialized) {
                            openModal();
                        }
                        clearTimeout(chatBoxInitDelayTimer);
                    }, config.properties.modal_open_on_init_delay * 1000);
                }

                function makeChatBubbleDraggable(element, flag) {
                    if (flag) {
                        let draggable = document.getElementById(element);

                        let posX = 0,
                            posY = 0,
                            mouseX = 0,
                            mouseY = 0;

                        draggable.addEventListener('mousedown', mouseDown, false);
                        window.addEventListener('mouseup', mouseUp, false);

                        function mouseDown(e) {
                            e.preventDefault();
                            posX = e.clientX - draggable.offsetLeft;
                            posY = e.clientY - draggable.offsetTop;
                            window.addEventListener('mousemove', moveElement, false);
                        }

                        function mouseUp() {
                            window.removeEventListener('mousemove', moveElement, false);
                        }

                        function moveElement(e) {
                            mouseX = e.clientX - posX;
                            mouseY = e.clientY - posY;
                            draggable.style.left = mouseX + 'px';
                            draggable.style.top = mouseY + 'px';
                        }
                    }
                }

                showCta();
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }
        };

        window.pfCfActivators.activateChatComponent = activateChatComponent;
    }

    if (typeof window.initializeChatWidget !== 'function') {
        window.initializeChatWidget = async (initConfig = {}) => {
            if (initConfig.isPreview || (window.location === window.parent.location)) {
                window.pfCfActivators.activateChatComponent(initConfig);
                console.log(`PFCF Activation Components Script initialized for ${initConfig.token} -> ${initConfig.widgetType}`);
            }
        };
    }

    if (typeof window.enableDraftMode !== 'function') {
        window.enableDraftMode = (token, widgetType, expireInHours) => {
            const now = Date.now(); // current time in ms
            const ttl = expireInHours * 60 * 60 * 1000; // expireInHours hours in ms
            const item = {
                token,
                widgetType,
                expiry: now + ttl // ttl in milliseconds
            };
            localStorage.setItem(`cf_activation_draft_${token}_${widgetType}`, JSON.stringify(item));
            console.log(`PFCF Activation Components Script initialized in DRAFT MODE for ${token} -> ${widgetType}`);
        };
    }


    // Optional: Run once-on-load initialization logic
    if (!window.pfCfActivators._initialized) {
        console.log('pfCfActivators initialized');
        window.pfCfActivators._initialized = true;
    }
})();
