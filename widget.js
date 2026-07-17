(function () {
    // namespace to group functions
    if (!window.pfCfActivators) {
        window.pfCfActivators = {};
    }

    /** Diagnostic logging (off by default). Enable before first log: URL `?pfCfActivatorsDebug=1`, localStorage `pfCfActivatorsDebug`=`1`, inline `window.__PF_CF_ACTIVATORS_DEBUG__=true` before this script, or DevTools `pfCfActivators.setDebug(true)` (may miss sync init lines). */
    const PF_CF_ACTIVATORS_DEBUG = '__PF_CF_ACTIVATORS_DEBUG__';
    try {
        const sp = new URLSearchParams(window.location.search || '');
        if (sp.get('pfCfActivatorsDebug') === '1' || sp.get('pfCfDebug') === '1') {
            window[PF_CF_ACTIVATORS_DEBUG] = true;
        }
    } catch (e) {}
    try {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('pfCfActivatorsDebug') === '1') {
            window[PF_CF_ACTIVATORS_DEBUG] = true;
        }
    } catch (e) {}
    const nc = console;
    const pfCfDbg = {
        enabled() {
            try {
                return window[PF_CF_ACTIVATORS_DEBUG] === true;
            } catch (e) {
                return false;
            }
        },
        log(...args) {
            if (pfCfDbg.enabled()) nc.log(...args);
        },
        warn(...args) {
            if (pfCfDbg.enabled()) nc.warn(...args);
        },
        error(...args) {
            if (pfCfDbg.enabled()) nc.error(...args);
        }
    };
    if (typeof window.pfCfActivators.setDebug !== 'function') {
        window.pfCfActivators.setDebug = (on) => {
            try {
                window[PF_CF_ACTIVATORS_DEBUG] = Boolean(on);
            } catch (e) {}
            return pfCfDbg.enabled();
        };
        window.pfCfActivators.isDebugEnabled = () => pfCfDbg.enabled();
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
                            cta_icon_position: 'before', // 'before' or 'after'
                            cta_icon_rotate: true,
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
                            modal_expand_limit: 60,
                            callout_bgcolor: "#ffffff",
                            callout_margin: 10,
                            callout_action_width: 'auto',
                            callout_action_pointer: 'right',
                            theme_color: '#7C3AED',
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
                            chat_shield_background: '#00000000',
                            modal_controls_background_enable: false,
                            modal_controls_background_color: '#e0e0e0',
                            modal_controls_icon_color: '#a0a0a0',
                            modal_controls_show_expand: false,
                            handshake_domain: ''
                        }
                    },
                    "drawer": {
                        "type": "drawer",
                        "properties": {
                            is_published: true,
                            chat_position: 'fixed', // 'fixed', 'absolute', 'relative'
                            chat_valign: 'center', // 'top' or 'bottom'
                            chat_halign: 'right', // 'left', 'right', or 'center'
                            chat_margin: 20, // margin from edges
                            modal_valign: 'end', // 'end', 'start', 'center'
                            modal_halign: 'end', // 'end', 'start', 'center'
                            modal_margin: 0, // margin from edges
                            chat_info_halign: 'end', // 'normal', 'end', 'start', 'center'
                            cta_init_delay: 10,
                            cta_width: 50,
                            cta_height: 180,
                            cta_icon_type: 'img',
                            cta_icon: { url: '' },
                            cta_icon_size: 50,
                            cta_icon_height: 50,
                            cta_icon_color: '#000000',
                            cta_icon_stroke_color: '#000000',
                            cta_icon_stroke_width: 2,
                            cta_icon_position: 'before', // 'before' or 'after'
                            cta_icon_rotate: true,
                            cta_label: 'Chat with us',
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
                            modal_expand_limit: 60,
                            callout_bgcolor: "#ffffff",
                            callout_margin: 10,
                            callout_action_width: 'auto',
                            callout_action_pointer: 'right',
                            drawer_flip_text: false,
                            theme_color: '#7C3AED',
                            cta_is_draggable: false,
                            cta_is_resizable: false,
                            cta_block_enable: false, // allow user to edit the cta block
                            callout_enable: false,
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
                            chat_shield_background: '#00000000',
                            modal_controls_background_enable: false,
                            modal_controls_background_color: '#e0e0e0',
                            modal_controls_icon_color: '#a0a0a0',
                            modal_controls_show_expand: false,
                            handshake_domain: ''
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
                            cta_icon_position: 'before', // 'before' or 'after'
                            cta_icon_rotate: true,
                            cta_label: '',
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
                            modal_expand_limit: 60,
                            callout_bgcolor: "#ffffff",
                            callout_margin: 10,
                            callout_action_width: 'auto',
                            callout_action_pointer: 'left',
                            theme_color: '#7C3AED',
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
                            chat_shield_background: '#00000000',
                            modal_controls_background_enable: false,
                            modal_controls_background_color: '#e0e0e0',
                            modal_controls_icon_color: '#a0a0a0',
                            modal_controls_show_expand: false,
                            handshake_domain: ''
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
                        let agentSource = `${origin}${cfContext}?initiator=chat_widget&widget_token=${token}&widget_type=${widgetType}&activator=${componentType}&parent_url=${window.parent.location.href}`;
                        let handshakeDomain = initConfig.handshakeDomain ?? widgetData?.cf_widget?.handshake_domain;

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
                            handshakeDomain: handshakeDomain,
                            cfContext: cfContext,
                            agentStatus: agentStatus,
                            defaultConfig: defaultConfig
                        };

                        let storedConfig = widgetData?.cf_widget?.theme?.widgets?.[widgetType] ?? {};
                        if (isPreview && initConfig[widgetType] && typeof initConfig[widgetType] === 'object') {
                            storedConfig = initConfig[widgetType];
                        }
                        if (!initConfig.isPreview) {
                            checkAgentAvailabilityStatus(widgetConfig)
                                .then(flag => {
                                    flag ? buildChat(widgetConfig, storedConfig) : pfCfDbg.log(`${widgetConfig.widgetType} -> 'âš ï¸ Widget is not initialized as Agent is unavailable`);
                                })
                                .catch(e => {
                                    pfCfDbg.log(`${widgetConfig.widgetType} -> âš ï¸ Agent availability check failed`, e);
                                });
                        } else {
                            buildChat(widgetConfig, storedConfig);
                            window.addEventListener(
                                "message",
                                (event) => {
                                    if (event?.data?.type === 'event_theme') {
                                        pfCfDbg.log(`${widgetConfig.widgetType} -> Event Theme`, event.data.message);
                                        let widgetType = event.data?.message?.widgetType ?? event.data?.message?.widgets?.[0]?.widget_type;
                                        let editedConfig = event.data?.message?.widgets?.[widgetType] ?? {};

                                        buildChat(widgetConfig, editedConfig);
                                    } else if (event?.data?.type === 'event_combined_data') {
                                        pfCfDbg.log(`${widgetConfig.widgetType} -> Event Combined Data`, event.data.message);
                                    }
                                },
                                false
                            );
                        }
                    },
                    function (err) {
                        pfCfDbg.log(`${initConfig.widgetType} -> Chat lookupConfig fallback`, err);
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
                pfCfDbg.log(`âš ï¸ Cookie consent check failed`, e);
                return true;
            }
        }

        const checkAgentAvailabilityStatus = async (widgetConfig, corsCheck = false) => {
            if (corsCheck) {
                return checkAgentAvailabilityInCORSCase(widgetConfig);
            } else {
                widgetConfig.agentStatus ? pfCfDbg.log(`${widgetConfig.widgetType} -> âœ… Agent is active (200)`) : pfCfDbg.log(`${widgetConfig.widgetType} -> âŒ Agent not active (404)`);
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
                    pfCfDbg.log(`${widgetType} -> âœ… Agent is active (200)`);
                    return true;
                } else if (response.status === 404) {
                    pfCfDbg.log(`${widgetType} -> âŒ Agent not found (404)`);
                    return false;
                } else {
                    pfCfDbg.log(`${widgetType} -> â„¹ï¸ Agent returned status: ${response.status}`);
                    return false;
                }
            } catch (error) {
                pfCfDbg.error(`${widgetType} -> ðŸš« Error checking Agent:`, error);
                const response = await checkAgentUrlIsLoading(url, containerId);
                pfCfDbg.log(`${widgetType} -> checkAgentUrlIsLoading`, response);
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
                pfCfDbg.log('Error:', error);
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

            const rawExpand = config.properties.modal_expand_limit;
            const expandLimit = (rawExpand != null && Number(rawExpand) > 0) ? ((Number(rawExpand) + 100) / 100) : 1;
            const hasLabel = !!config.properties.cta_label?.trim();
            const hasIcon = config.properties.cta_icon_type !== 'none';
            const hasBlock = !!config.properties.cta_block_enable;

            // Icon should scale down ONLY if it has to share space with a label
            const iconNeedsScaling = hasIcon && hasLabel;
            // Label should account for icon space ONLY if an icon exists
            const labelHasIconSibling = hasLabel && hasIcon;
            // Container query should be active if there's competition inside the bubble OR inside a search bar sharing with a full button
            const useContainerQueries = (hasIcon && hasLabel) || (hasBlock && labelHasIconSibling);

            // Create and inject CSS
            const styles = `
                /* Chat Shield Host container */
                ${chatShieldClass} {
                    background-color: ${widgetConfig.embedShieldBackground || config.properties.chat_shield_background || '#00000000'};
                }

                /* Modern UI Utility Classes */
                ${chatShieldClass} .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
                ${chatShieldClass} .backdrop-blur { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
                ${chatShieldClass} .transition-all { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                ${chatShieldClass} .rounded-xl { border-radius: 1rem; }

                /* Chat container - placement respects valign/halign. Drawer activator; both center = bubble fallback. */
                ${(() => {
                    const valign = config.properties.chat_valign || 'bottom';
                    const halign = config.properties.chat_halign || 'right';
                    const margin = config.properties.chat_margin ?? 20;
                    const isDrawer = config.type === 'drawer';
                    const bothCenter = valign === 'center' && halign === 'center';
                    const useDrawerUI = isDrawer && !bothCenter;
                    const isDrawerCenter = useDrawerUI && halign === 'center';
                    const verticalCss = isDrawerCenter
                        ? (valign === 'top' ? 'top: 0; bottom: auto;' : 'bottom: 0; top: auto;')
                        : (valign === 'center'
                            ? 'top: 50%; bottom: auto;'
                            : `${valign}: ${margin}px;`);
                    const horizontalCss = useDrawerUI
                        ? (halign === 'center'
                            ? 'left: 50%; right: auto;'
                            : halign === 'left'
                                ? 'left: 0; right: auto;'
                                : 'right: 0; left: auto;')
                        : (halign === 'center'
                            ? 'left: 50%;'
                            : `${halign}: ${margin}px;`);
                    const translateX = halign === 'center' ? '-50%' : '0';
                    const translateY = valign === 'center' ? '-50%' : '0';
                    return `
                ${chatShieldClass} .pf-cf-chat-container {
                    position: ${config.properties.chat_position};
                    ${verticalCss}
                    ${horizontalCss}
                    transform: translate(${translateX}, ${translateY});
                    z-index: 2147483646;
                    background: transparent;
                    ${config.properties.cta_block_enable ? `width: ${config.properties.cta_width}%;` : ''}
                    max-width: 95%;
                    display: flex;
                    flex-direction: column${valign === 'top' ? '-reverse' : ''};
                    align-items: ${halign === 'right' ? 'end' : 'start'};
                }
                ${useDrawerUI && valign === 'center' ? `
                ${chatShieldClass} .pf-cf-chat-container {
                    top: 50% !important;
                    bottom: auto !important;
                    transform: translate(${translateX}, -50%) !important;
                }
                ` : ''}`;
                })()}

                /* Chat cta container */
                ${chatShieldClass} .pf-cf-cta-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    float: ${config.properties.chat_halign === 'center' ?
                    'none' : config.properties.chat_halign
                };
                    background: ${config.properties.cta_container_background};
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-radius: ${config.properties.cta_container_border_radius}${(config.type === 'bubble' || config.type === 'drawer') ? 'px' : 'px'};
                    padding: 0px ${config.properties.cta_container_spacing || 0}px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    width: ${!config.properties.cta_block_enable ? (config.properties.cta_width > 0 ? config.properties.cta_width + 'px' : 'auto') : 100 + '%'};
                    height: ${config.properties.cta_height}px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 2147483646;
                    cursor: pointer;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    overflow: hidden;
                    ${useContainerQueries ? 'container-type: size;' : ''}
                    gap: ${hasBlock && (hasIcon || hasLabel) ? '10px' : '0px'};
                }

                ${chatShieldClass} .pf-cf-cta-container:hover {
                    background: ${config.properties.cta_container_background_on_hover};
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }

                /* Drawer Specific CTA (drawer activator; skip when both valign and halign center = bubble fallback) */
                ${(() => {
                    const halign = config.properties.chat_halign || 'right';
                    const valign = config.properties.chat_valign || 'bottom';
                    const useDrawerUI = config.type === 'drawer' && !(valign === 'center' && halign === 'center');
                    const isDrawerCenter = useDrawerUI && halign === 'center';
                    const r = config.properties.cta_container_border_radius ?? 20;
                    const rpx = r + 'px';
                    const drawerRadius = isDrawerCenter
                        ? (valign === 'top' ? `0 0 ${rpx} ${rpx}` : `${rpx} ${rpx} 0 0`)
                        : (halign === 'left' ? `0 ${rpx} ${rpx} 0` : `${rpx} 0 0 ${rpx}`);
                    const contentCounterRotate = isDrawerCenter ? (valign === 'top' ? '-90deg' : '90deg') : 'none';
                    const labelTransform = isDrawerCenter ? `rotate(${contentCounterRotate})` : (config.properties.drawer_flip_text ? (halign === 'right' ? 'rotate(360deg)' : 'rotate(180deg)') : (halign === 'right' ? 'rotate(180deg)' : 'none'));
                    const iconTransform = isDrawerCenter ? `rotate(${contentCounterRotate})` : (config.properties.cta_icon_rotate ? `rotate(${halign === 'left' ? '90deg' : '-90deg'})` : 'none');
                    return `
                ${chatShieldClass} .pf-cf-cta-drawer {
                    width: ${hasLabel ? config.properties.cta_width : config.properties.cta_width}px !important;
                    height: ${hasLabel ? config.properties.cta_height : (config.properties.cta_height_auto_adjust_on_no_label === false ? config.properties.cta_height : config.properties.cta_width)}px !important;
                    border-radius: ${drawerRadius} !important;
                    padding: 10px 5px !important;
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                }
                ${chatShieldClass} .pf-cf-cta-drawer-stick-bottom {
                    // transform: rotate(-90deg) !important;
                    transform-origin: bottom center !important;
                    border-radius: ${rpx} ${rpx} 0 0 !important;
                    overflow: visible !important;
                }
                ${chatShieldClass} .pf-cf-cta-drawer-stick-bottom:hover {
                    // transform: rotate(-90deg) translateY(-2px) !important;
                }
                ${chatShieldClass} .pf-cf-cta-drawer-stick-top {
                    // transform: rotate(90deg) !important;
                    transform-origin: top center !important;
                    border-radius: 0 0 ${rpx} ${rpx} !important;
                    overflow: visible !important;
                }
                ${chatShieldClass} .pf-cf-cta-drawer-stick-top:hover {
                    // transform: rotate(90deg) translateY(2px) !important;
                }
                ${chatShieldClass} .pf-cf-cta-drawer .pf-cf-cta-btn {
                    flex-direction: ${isDrawerCenter ? (config.properties.cta_icon_position === 'before' ? 'row' : 'row-reverse') : (config.properties.cta_icon_position === 'before' ? 'column-reverse' : 'column')} !important;
                    gap: ${hasLabel ? '12px' : '0'} !important;
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                }

                ${chatShieldClass} .pf-cf-cta-drawer .pf-cf-cta-label {
                    writing-mode: ${isDrawerCenter ? 'horizontal-tb' : 'vertical-rl'};
                    transform: ${labelTransform};
                    display: ${hasLabel ? 'flex' : 'none'} !important;
                    align-items: center;
                    justify-content: center;
                    white-space: nowrap;
                    margin: 0 !important;
                    line-height: 1;
                    text-align: center;
                }

                ${chatShieldClass} .pf-cf-cta-drawer #pf-cf-cta-icon,
                ${chatShieldClass} .pf-cf-cta-drawer .pf-cf-cta-img {
                    transform: ${iconTransform};
                    flex-shrink: 0;
                }`;
                })()}

                /* Chat cta block styling */
                ${chatShieldClass} .pf-cf-cta-block {
                    padding: ${config.properties.cta_block_enable ? '12px' : '0px'};
                    border: none;
                    border-radius: 25px;
                    outline: none;
                    font-size: 16px;
                    flex: 1;
                    min-width: 0;
                    background: transparent;
                    color: ${config.properties.cta_block_color || '#000000'};
                    display: ${config.properties.cta_block_enable ? 'block' : 'none'};
                    font-family: inherit;
                    padding-left: 20px;
                    padding-right: 15px;
                }

                /* Chat cta block placeholder */
                ${chatShieldClass} .pf-cf-cta-block::placeholder {
                    color: ${config.properties.cta_block_place_holder_color || '#a0a0a0'};
                    opacity: 1;  /* Optional: ensures full visibility in some browsers */
                }

                /* Chat cta label */
                ${chatShieldClass} .pf-cf-cta-label {
                    color: ${config.properties.cta_label_color || '#000000'};
                    font-size: ${iconNeedsScaling ? `clamp(8px, 20cqh, ${config.properties.cta_label_size}px)` : `${config.properties.cta_label_size}px`};
                    cursor: pointer;
                    display: ${config.properties.cta_block_enable || !hasLabel ? 'none' : 'block'};
                    font-weight: 500;
                    font-family: inherit;
                    white-space: nowrap;
                    max-width: ${labelHasIconSibling ? 'calc(100% - 35px)' : '100%'};
                    line-height: normal;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                }

                /* cta button */
                ${chatShieldClass} .pf-cf-cta-btn {
                    margin: 0;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: ${(!hasLabel && !hasBlock) ? '0' : ((config.type === 'bubble' || config.type === 'drawer') ? '8px' : '5px')};
                    display: flex;
                    flex-direction: ${config.properties.cta_icon_position === 'before' ? 'row-reverse' : 'row'};
                    gap: ${labelHasIconSibling ? (config.properties.cta_button_spacing || 12) : 0}px;
                    align-items: center;
                    justify-content: center;
                    width: ${hasBlock ? 'auto' : '100%'};
                    height: 100%;
                    box-sizing: border-box;
                    flex-shrink: 0;
                }

                ${chatShieldClass} #pf-cf-cta-icon {
                    width: ${iconNeedsScaling ? `clamp(12px, 60cqh, ${config.properties.cta_icon_size}px)` : `${config.properties.cta_icon_size}px`};
                    height: ${iconNeedsScaling ? `clamp(12px, 60cqh, ${config.properties.cta_icon_height || config.properties.cta_icon_size}px)` : `${config.properties.cta_icon_height || config.properties.cta_icon_size}px`};
                    max-width: 100%;
                    max-height: 100%;
                    fill: ${config.properties.cta_icon_color || '#000000'};
                    stroke: ${config.properties.cta_icon_stroke_color || '#000000'};
                    stroke-width: ${config.properties.cta_icon_stroke_width || 2};
                    transition: fill 0.3s;
                    cursor: pointer;
                    flex-shrink: 0;
                    display: block;
                }

                ${chatShieldClass} #pf-cf-cta-icon:hover {
                    fill: ${config.properties.cta_icon_color || '#000000'};
                }

                ${chatShieldClass} .pf-cf-cta-img-container {
                    width: ${iconNeedsScaling ? `clamp(12px, 60cqh, ${config.properties.cta_icon_size}px)` : `${config.properties.cta_icon_size}px`};
                    height: ${iconNeedsScaling ? `clamp(12px, 60cqh, ${config.properties.cta_icon_height || config.properties.cta_icon_size}px)` : `${config.properties.cta_icon_height || config.properties.cta_icon_size}px`};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border-radius: inherit;
                    flex-shrink: 0;
                }

                ${chatShieldClass} .pf-cf-cta-img {
                    width: 100%;
                    height: 100%;
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    border-radius: ${config.properties.cta_container_border_radius}${(config.type === 'bubble' || config.type === 'drawer') ? 'px' : 'px'};
                    padding: ${config.properties.cta_container_spacing || 0}px;
                    transition: fill 0.3s;
                    cursor: pointer;
                    display: block;
                }

                /* Callout: always horizontal, always floats (position: absolute) so CTA never shifts. Pointer and above/below from valign/halign. halign center = pointer to left, start-aligned. */
                ${(() => {
                    const valign = config.properties.chat_valign || 'bottom';
                    const halign = config.properties.chat_halign || 'right';
                    const pointer = halign === 'center' ? 'left' : (halign === 'right' ? 'right' : 'left');
                    const marginSide = valign === 'center' ? 'bottom' : valign;
                    const marginVal = config.properties.callout_margin ?? 10;
                    const pointerEdge = valign === 'center' ? 'bottom' : valign;
                    const calloutAbove = valign !== 'top';
                    const vertPos = calloutAbove ? 'bottom: 100%; top: auto;' : 'top: 100%; bottom: auto;';
                    const horzPos = halign === 'right' ? 'right: 0; left: auto;' : (halign === 'left' ? 'left: 0; right: auto;' : 'left: 0; right: auto;');
                    const baseTransform = valign === 'top' ? 'translateY(8px)' : 'translateY(-8px)';
                    const visibleTransform = 'none';
                    return `
                ${chatShieldClass} .pf-cf-chat-info-box {
                    position: absolute;
                    ${vertPos}
                    ${horzPos}
                    width: max-content;
                    max-width: min(90vw, ${(config.properties.callout_char_limit || 30) + 2}ch);
                    display: none;
                    flex-direction: column${valign === 'top' ? '-reverse' : ''};
                    align-items: ${config.properties.chat_info_halign || 'normal'};
                    opacity: 0;
                    transform: ${baseTransform};
                    transition: opacity 0.25s ease-out, transform 0.25s ease-out;
                }
                ${chatShieldClass} .pf-cf-chat-info-box.pf-cf-callout-visible {
                    opacity: 1;
                    transform: ${visibleTransform};
                }
                ${chatShieldClass} .pf-cf-chat-promo-box-action {
                    display: ${config.properties.callout_action_enable ? 'block' : 'none'};
                    width: ${config.properties.callout_action_width || 'auto'};
                }
                ${chatShieldClass} #pfCfChatInfoBox .tooltip-action {
                    background: ${config.properties.cta_container_background};
                    border-radius: 12px;
                    padding: 8px;
                    color: ${config.properties.cta_label_color || '#000000'};
                    margin-${marginSide}: ${marginVal}px;
                    text-align: center;
                    cursor: pointer;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    font-family: inherit;
                }
                ${chatShieldClass} #pfCfChatInfoBox .tooltip {
                    max-width: ${config.properties.callout_char_limit || 30}ch;
                    background: ${config.properties.callout_bgcolor};
                    margin-${marginSide}: ${marginVal}px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    font-family: inherit;
                }
                ${chatShieldClass} #pfCfChatInfoBox .tooltip {
                    --s: 2em;
                    --r: 2em;
                    padding: 1em;
                    border: 1px solid rgba(0,0,0,0.05);
                    border-radius: calc(var(--r) + var(--s));
                    border-${pointerEdge}-${pointer}-radius: 0;
                }`;
                })()}

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

                /* Modal - Drawer Logic */

                /* Standard Modal (Center/End) - when not pinned: backdrop captures clicks to close; when pinned: pointer-events none so host page is actionable */
                ${chatModalShieldClass} .pf-cf-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: none;
                    z-index: 2147483647;
                    box-sizing: border-box;
                    padding: ${config.properties.modal_margin || 0}px;
                    justify-content: ${config.properties.modal_halign === 'start' ? 'flex-start' : (config.properties.modal_halign === 'end' ? 'flex-end' : 'center')};
                    align-items: ${config.properties.modal_valign === 'start' ? 'flex-start' : (config.properties.modal_valign === 'end' ? 'flex-end' : 'center')};
                    background-color: transparent; 
                    display: none;
                    transition: none; /* Handled by content */
                    opacity: 1; 
                    z-index: 2147483647;
                }
                ${chatModalShieldClass} .pf-cf-modal:not(.pf-cf-modal-pinned) {
                    pointer-events: auto; /* Backdrop receives clicks â†’ close on outside click */
                }
                ${chatModalShieldClass} .pf-cf-modal.pf-cf-modal-pinned {
                    pointer-events: none; /* Clicks pass through to host page when pinned */
                }
                
                /* Backdrop only if needed */
                ${chatModalShieldClass} .pf-cf-modal.has-backdrop:not(.pf-cf-modal-pinned) {
                     background-color: rgba(0, 0, 0, ${(config.properties.modal_backdrop_darkness_depth * 0.1) || 0.2});
                     backdrop-filter: blur(${config.properties.modal_backdrop_filter_depth || 0}px);
                     pointer-events: auto;
                     transition: background-color 0.3s ease;
                }
                ${chatModalShieldClass} .pf-cf-modal.has-backdrop.pf-cf-modal-pinned {
                     background-color: rgba(0, 0, 0, ${(config.properties.modal_backdrop_darkness_depth * 0.1) || 0.2});
                     backdrop-filter: blur(${config.properties.modal_backdrop_filter_depth || 0}px);
                     pointer-events: none;
                     transition: background-color 0.3s ease;
                }

                ${chatModalShieldClass} .pf-cf-modal-content {
                    pointer-events: auto; /* Chat panel always receives clicks */
                    z-index: 2147483647;
                    background-color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    box-sizing: border-box;
                    /* Drawer slide only when modal_halign left or right */
                    ${(() => {
                        const drawerSlide = config.type === 'drawer' && (config.properties.modal_halign === 'start' || config.properties.modal_halign === 'end');
                        const fromLeft = config.properties.modal_halign === 'start';
                        if (drawerSlide) {
                            return `
                        height: 100% !important;
                        width: ${config.properties.modal_content_width || 30}%;
                        max-width: 100vw;
                        border-radius: 0;
                        ${fromLeft ? 'border-top-right-radius: 20px; border-bottom-right-radius: 20px;' : 'border-top-left-radius: 20px; border-bottom-left-radius: 20px;'}
                        transform: translateX(${fromLeft ? -100 : 100}%);
                        margin: 0;
                        `;
                        }
                        return `
                        border-radius: 20px;
                        min-width: 400px;
                        width: ${config.properties.modal_content_width || 30}%;
                        height: ${config.properties.modal_content_height || 80}%;
                        transform: scale(0.1);
                        transform-origin: ${config.properties.chat_valign || 'bottom'} ${config.properties.chat_halign || 'right'};
                        opacity: 0;
                        max-height: calc(100vh - ${2 * (config.properties.modal_margin || 0)}px);
                        `;
                    })()}
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.5);
                    background: linear-gradient(145deg, #e0e0e0, #ffffff);
                    max-width: calc(100vw - ${2 * (config.properties.modal_margin || 0)}px);
                    overflow: hidden;
                }

                /* Active States */
                ${chatModalShieldClass} .pf-cf-modal.active {
                    display: flex;
                }
                
                ${chatModalShieldClass} .pf-cf-modal.active .pf-cf-modal-content {
                    ${(() => {
                        const drawerSlide = config.type === 'drawer' && (config.properties.modal_halign === 'start' || config.properties.modal_halign === 'end');
                        if (drawerSlide) return `transform: translateX(0);`;
                        return `transform: scale(1); opacity: 1;`;
                    })()}
                }

                ${chatModalShieldClass} .pf-cf-modal-content.expanded {
                    ${(() => {
                        const drawerSlide = config.type === 'drawer' && (config.properties.modal_halign === 'start' || config.properties.modal_halign === 'end');
                        if (drawerSlide) return `width: ${(config.properties.modal_content_width || 30) * expandLimit}% !important;`;
                        return `
                        width: ${Math.min((config.properties.modal_content_width || 30) * expandLimit, 100)}% !important;
                        height: ${Math.min((config.properties.modal_content_height || 80) * expandLimit, 100)}% !important;
                        max-height: calc(100vh - ${2 * (config.properties.modal_margin || 0)}px) !important;
                    `;
                    })()}
                }

                /* Iframe container */
                ${chatModalShieldClass} .pf-cf-iframe-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    /* padding-bottom removed for full height flex */
                    flex: 1;
                    padding-bottom: 0;
                    background: transparent;
                    border-radius: inherit;
                    overflow: hidden;
                    display: flex;
                }

                /* Iframe styling */
                ${chatModalShieldClass} .pf-cf-iframe-container iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    transition: opacity 0.3s ease-in-out;
                }

                /* Floating controls wrapper (shared) */
                ${chatModalShieldClass} .pf-cf-modal-controls {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    display: flex;
                    flex-direction: row-reverse;
                    align-items: center;
                    z-index: 10;
                    background: ${config.properties.modal_controls_background_enable ? (config.properties.modal_controls_background_color || '#e0e0e0') : 'transparent'};
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 20px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out 0.4s;
                }

                ${chatModalShieldClass} .pf-cf-modal.active .pf-cf-modal-controls {
                    opacity: 1;
                }

                /* Multi-action: â‹® + expand on hover / focus-within */
                ${chatModalShieldClass} .pf-cf-modal-controls--multi {
                    gap: 0;
                    cursor: pointer;
                    overflow: hidden;
                    max-width: 25px;
                }

                ${chatModalShieldClass} .pf-cf-modal-controls--multi:hover,
                ${chatModalShieldClass} .pf-cf-modal-controls--multi:focus-within {
                    max-width: 150px;
                    gap: 4px;
                    padding: 4px 8px;
                }

                ${chatModalShieldClass} .pf-cf-controls-panel {
                    display: flex;
                    gap: 4px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                ${chatModalShieldClass} .pf-cf-modal-controls--multi .pf-cf-controls-panel {
                    opacity: 0;
                    transform: translateX(10px);
                    pointer-events: none;
                }

                ${chatModalShieldClass} .pf-cf-modal-controls--multi:hover .pf-cf-controls-panel,
                ${chatModalShieldClass} .pf-cf-modal-controls--multi:focus-within .pf-cf-controls-panel {
                    opacity: 1;
                    transform: translateX(0);
                    pointer-events: auto;
                }

                ${chatModalShieldClass} .pf-cf-modal-controls--multi .pf-cf-menu-dots {
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                ${chatModalShieldClass} .pf-cf-modal-controls--multi:hover .pf-cf-menu-dots,
                ${chatModalShieldClass} .pf-cf-modal-controls--multi:focus-within .pf-cf-menu-dots {
                    opacity: 0;
                    width: 0;
                    pointer-events: none;
                }

                /* Single visible action: no â‹®, panel always open */
                ${chatModalShieldClass} .pf-cf-modal-controls--single {
                    max-width: none;
                    gap: 4px;
                    padding: 4px 8px;
                    overflow: visible;
                    cursor: default;
                }

                ${chatModalShieldClass} .pf-cf-modal-controls--single .pf-cf-menu-dots {
                    display: none !important;
                }

                ${chatModalShieldClass} .pf-cf-modal-controls--single .pf-cf-controls-panel {
                    opacity: 1;
                    transform: none;
                    pointer-events: auto;
                }

                /* Spinner styling */
                ${chatModalShieldClass} .pf-cf-spinner {
                    display: none;
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid ${config.properties.theme_color};
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin: -20px 0 0 -20px;
                    z-index: 10;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                ${chatModalShieldClass} .pf-cf-spinner-fade-out {
                    opacity: 0 !important;
                }

                /* Control buttons */
                ${chatModalShieldClass} .pf-cf-icon-btn {
                    width: 25px;
                    height: 25px;
                    border-radius: 8px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                    color: ${config.properties.modal_controls_icon_color || '#a0a0a0'};
                }

                ${chatModalShieldClass} .pf-cf-icon-btn:hover {
                    background: #f3f4f6;
                    color: #111827;
                }

                /* Icons */
                .pf-cf-icon-close::before { content: 'âœ•'; font-size: 14px; }

                .pf-cf-icon-expand::before { content: 'â›¶'; font-size: 16px; }
                .pf-cf-icon-collapse::before { content: 'â›¶'; font-size: 14px; }
                .pf-cf-icon-menu::before { content: 'â‹®'; font-size: 20px; font-weight: bold; }
                .pf-cf-icon-pin::before { content: 'ðŸ“Œ'; font-size: 14px; }

                ${chatModalShieldClass} .pf-cf-icon-btn.active {
                    color: ${config.properties.theme_color || '#4f46e5'};
                    background-color: rgba(0, 0, 0, 0.05);
                }
                
                /* Mobile overrides */
                @media (max-width: 767px) {
                    ${chatShieldClass} .pf-cf-chat-container {
                        ${config.properties.cta_block_enable && config.properties.chat_halign !== 'center' ?
                    `left: 10px; right: 10px; width: auto;` : `width: auto;`
                }            
                    }

                    ${chatModalShieldClass} .pf-cf-modal {
                        align-items: flex-end; /* Bottom sheet on mobile if drawer */
                    }

                    ${chatModalShieldClass} .pf-cf-modal-content {
                        width: 100% !important;
                        height: 100% !important;
                        border-radius: 20px 20px 0 0 !important;
                        ${config.type === 'drawer' ?
                    `transform: translateY(100%);` : ``
                }
                    }
                    
                     ${chatModalShieldClass} .pf-cf-modal.active .pf-cf-modal-content {
                        ${config.type === 'drawer' ?
                    `transform: translateY(0);` :
                    `transform: scale(1); opacity: 1;`
                }
                    }

                    ${chatModalShieldClass} .pf-cf-modal-content.expanded {
                        ${config.type === 'drawer' ?
                    `
                            width: 100% !important;
                            height: 60% !important;
                        ` :
                    `
                            width: 100% !important;
                            height: 60% !important;
                        `
                }
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
                    <div class="pf-cf-cta-container${(config.type === 'drawer' && !(config.properties.chat_valign === 'center' && config.properties.chat_halign === 'center')) ? ' pf-cf-cta-drawer' : ''}${(config.type === 'drawer' && config.properties.chat_halign === 'center' && config.properties.chat_valign !== 'center') ? (config.properties.chat_valign === 'top' ? ' pf-cf-cta-drawer-stick-top' : ' pf-cf-cta-drawer-stick-bottom') : ''}" id="ctaContainer">
                        ${isDraftModeActive(widgetConfig.token, widgetConfig.widgetType) ? `<div class="pf-cf-mode-tag">Draft Mode</div>` : ''}
                        <input type="text" class="pf-cf-cta-block" placeholder="${config.properties.cta_block_place_holder}" id="pfCfCtaBlock">
                        <div class="pf-cf-cta-btn" id="pfCfCtaBtn">
                            ${hasLabel ? `<div class="pf-cf-cta-label" id="pfCfCtaLabel">${config.properties.cta_label}</div>` : ''}
                            ${hasIcon ? (config.properties.cta_icon_type === 'svg' ?
                    (
                        cta_icon_svg || cta_icon_default_svg
                    ) :
                    (
                        cta_icon_img || cta_icon_default_svg
                    )) : ''
                }
                        </div>
                    </div>
                    <button class="pf-cf-cta-expand-icon">â¤¢</button>
                </section>
        `;

            // Inject modal separately from chat container
            const modalControlsShowExpand = config.properties.modal_controls_show_expand !== false;
            const modalExpandBtnAttr = modalControlsShowExpand ? '' : ' style="display: none;"';
            const modalHTML = `
                <div class="pf-cf-modal${config.properties.modal_backdrop_enable ? ' has-backdrop' : ''}" id="modal">
                    <div class="pf-cf-modal-content" id="modalContent">
                        <div class="pf-cf-modal-controls pf-cf-modal-controls--multi">
                            <div class="pf-cf-menu-dots">
                                <button class="pf-cf-icon-btn pf-cf-icon-menu" title="Menu"></button>
                            </div>
                            <div class="pf-cf-controls-panel">
                                <button style="display: none;" class="pf-cf-icon-btn pf-cf-icon-pin" id="pfCfModalPinBtn" title="Pin Chat"></button>
                                <button class="pf-cf-icon-btn pf-cf-icon-expand" id="pfCfModalExpandBtn" title="Expand"${modalExpandBtnAttr}></button>
                                <button class="pf-cf-icon-btn pf-cf-icon-close" id="pfCfModalCloseBtn" title="Close"></button>
                            </div>
                        </div>
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
                    pfCfDbg.log(`${widgetConfig.widgetType} -> Error removing chat shields: `, e);
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
                    if (targetElementId) {
                        pfCfDbg.warn(`Element with id "${targetElementId}" not found. Defaulting to Floating Mode.`);
                    }

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
                        pfCfDbg.log('Chat Shield Host already injected. Skipping duplicate.');
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


                const modalExpandBtn = chatModalShieldContainer.querySelector('#pfCfModalExpandBtn');

                const modalControlsRoot = chatModalShieldContainer.querySelector('.pf-cf-modal-controls');
                if (modalControlsRoot) {
                    const controlsPanelEl = modalControlsRoot.querySelector('.pf-cf-controls-panel');
                    if (controlsPanelEl) {
                        let visibleModalActionCount = 0;
                        controlsPanelEl.querySelectorAll('.pf-cf-icon-btn').forEach((btn) => {
                            const st = window.getComputedStyle(btn);
                            if (st.display !== 'none' && st.visibility !== 'hidden') visibleModalActionCount++;
                        });
                        modalControlsRoot.classList.remove('pf-cf-modal-controls--single', 'pf-cf-modal-controls--multi');
                        modalControlsRoot.classList.add(visibleModalActionCount <= 1 ? 'pf-cf-modal-controls--single' : 'pf-cf-modal-controls--multi');
                    }
                }

                let isModalInitialized = false;
                let isModalInOpenState = false;
                let isModalExpanded = false;

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
                if (cta_label) {
                    cta_label.addEventListener('click', openModal);
                }
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
                    const isPinned = localStorage.getItem(`pf_cf_pinned_${widgetConfig.token}`) === 'true';
                    // Close if clicking outside modal content (backdrop) when not pinned
                    if (!isPinned && modalContent && !modalContent.contains(event.target)) {
                        closeModal();
                    }
                });

                // Pin functionality: when pinned, overlay has pointer-events: none so host page is clickable; when not pinned, click outside closes modal
                const modalPinBtn = chatModalShieldContainer.querySelector('#pfCfModalPinBtn');
                function updateModalPinnedClass() {
                    const isPinned = localStorage.getItem(`pf_cf_pinned_${widgetConfig.token}`) === 'true';
                    if (isPinned) {
                        modal.classList.add('pf-cf-modal-pinned');
                    } else {
                        modal.classList.remove('pf-cf-modal-pinned');
                    }
                }
                if (modalPinBtn) {
                    const isPinned = localStorage.getItem(`pf_cf_pinned_${widgetConfig.token}`) === 'true';
                    if (isPinned) modalPinBtn.classList.add('active');
                    updateModalPinnedClass();

                    modalPinBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const currentlyPinned = localStorage.getItem(`pf_cf_pinned_${widgetConfig.token}`) === 'true';
                        const newState = !currentlyPinned;

                        localStorage.setItem(`pf_cf_pinned_${widgetConfig.token}`, newState);

                        if (newState) {
                            modalPinBtn.classList.add('active');
                        } else {
                            modalPinBtn.classList.remove('active');
                        }
                        updateModalPinnedClass();
                    });
                }

                if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);


                // Expand/Collapse toggle
                if (modalExpandBtn) {
                    modalExpandBtn.addEventListener('click', () => {
                        isModalExpanded = !isModalExpanded;
                        if (isModalExpanded) {
                            modalContent.classList.add('expanded');
                            modalExpandBtn.classList.remove('pf-cf-icon-expand');
                            modalExpandBtn.classList.add('pf-cf-icon-collapse');
                            modalExpandBtn.title = 'Collapse';
                        } else {
                            modalContent.classList.remove('expanded');
                            modalExpandBtn.classList.remove('pf-cf-icon-collapse');
                            modalExpandBtn.classList.add('pf-cf-icon-expand');
                            modalExpandBtn.title = 'Expand';
                        }
                    });
                }


                // Call showCallout when the page loads
                // window.addEventListener('load', showCallout);
                // window.addEventListener('focus', showCallout);
                // window.addEventListener('blur', hideCallout);

                function openAgent() {
                    try {
                        waitForAgentWorker((containerRefreshed) => {
                            let agentWorker = iframe?.contentWindow?.AgentWorker;
                            agentWorker ? pfCfDbg.log(`${widgetConfig.widgetType} -> AgentWorker is available.`) : pfCfDbg.log(`${widgetConfig.widgetType} -> AgentWorker is not available.`);
                            let query = ctaBlock?.value?.trim();
                            let payload = { query, token: widgetConfig.token };
                            pfCfDbg.log(`${widgetConfig.widgetType} -> AgentWorker OpenAgent Payload: `, payload);
                            agentWorker?.openAgent(payload);
                            ctaBlock.value = '';
                        });
                    } catch (error) {
                        pfCfDbg.log(`${widgetConfig.widgetType} -> Error accessing AgentWorker.`, error);
                        try {
                            let query = ctaBlock?.value?.trim();
                            let payload = { query, token: widgetConfig.token };
                            pfCfDbg.log(`${widgetConfig.widgetType} -> AgentWorker OpenAgent Payload Post Message: `, payload);
                            const postMessagePayload = { type: 'cfOpenAgent', payload };
                            const targetOrigin = (() => {
                                const handshakeDomainResolved =
                                    widgetConfig.handshakeDomain ??
                                    config.properties?.handshake_domain;
                                if (handshakeDomainResolved && typeof handshakeDomainResolved === 'string') {
                                    try {
                                        const raw = handshakeDomainResolved.includes('://') ? handshakeDomainResolved : `https://${handshakeDomainResolved}`;
                                        return new URL(raw).origin;
                                    } catch {}
                                }
                                try { return new URL(iframe.src).origin; } catch { return '*'; }
                            })();
                            iframe.contentWindow?.postMessage(JSON.stringify(postMessagePayload), targetOrigin);
                            ctaBlock.value = '';
                        } catch (e) {
                            pfCfDbg.error(`${widgetConfig.widgetType} -> Error posting message to iframe: `, e);
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
                            pfCfDbg.log(`${widgetConfig.widgetType} -> ` + (!pfConsent ? 'pfConsent not available and the ' : '') + 'container is auto refreshed to initialize frame source');
                            let iframeSrc = widgetConfig.agentSource;
                            iframe.src = iframeSrc;
                            containerRefreshed = true;
                        }
                    } catch (e) {
                        pfCfDbg.log(`${widgetConfig.widgetType} -> Error refreshing container: `, e);
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
                                pfCfDbg.error(`${widgetConfig.widgetType} -> AgentWorker not identified in container within timeout.`);
                                callback(false);
                            }
                        } catch (e) {
                            pfCfDbg.log(`${widgetConfig.widgetType} -> Error checking for AgentWorker: `, e);
                            callback(false);
                        }
                    };
                    checkForResource();
                }

                /* Modal content styling - 1 */
                async function openModal() {
                    isModalInitialized = true;
                    isModalInOpenState = true;

                    try {
                        waitForAgentWorker((containerRefreshed) => {
                            containerRefreshed ? pfCfDbg.log(`${widgetConfig.widgetType} -> Container Refreshed.`) : pfCfDbg.log(`${widgetConfig.widgetType} -> Container Refresh Not detected.`);
                        });
                    } catch (e) {
                        pfCfDbg.log(`${widgetConfig.widgetType} -> Skipped AgentWorker check due to environment restrictions.`);
                    }

                    // Set display first, then trigger animation on next frame for smooth transition
                    modal.style.display = 'flex';
                    updateModalPinnedClass(); // Apply pin state so overlay is click-through when pinned, backdrop when not

                    // Use requestAnimationFrame to ensure the browser registers the initial state
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            modal.classList.add('active');
                        });
                    });

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
                        iframeContainer.style.display = 'block'; // Make sure iframe container is visible (was flex in css but JS hid it)
                        iframeContainer.style.display = 'flex';
                        iframe.style.opacity = '1';
                    }, 1500);
                }

                function closeModal() {
                    isModalInOpenState = false;

                    modal.classList.remove('active');

                    // Reset expanded state
                    if (isModalExpanded) {
                        isModalExpanded = false;
                        modalContent.classList.remove('expanded');
                        if (modalExpandBtn) {
                            modalExpandBtn.classList.remove('pf-cf-icon-collapse');
                            modalExpandBtn.classList.add('pf-cf-icon-expand');
                            modalExpandBtn.title = 'Expand';
                        }
                    }

                    // Restore CTA after animation completes
                    setTimeout(() => {
                        modal.style.display = 'none';
                        ctaContainer.style.transform = 'scale(1)';
                        ctaContainer.style.opacity = '1';
                    }, 500); // Match the CSS transition duration
                }

                function showCta() {
                    // Show the cta after a delay
                    if (!chatShieldContainer) return;
                    chatShieldContainer.style.opacity = '0';
                    chatShieldContainer.style.display = 'none';

                    let startTime = Date.now();
                    let runningTime = Date.now();
                    let delayCtaTime = (widgetConfig.isPreview ? 0 : (config.properties.cta_init_delay || 0)) * 1000;

                    try {
                        waitForAgentWorker((containerRefreshed) => {
                            containerRefreshed ? pfCfDbg.log(`${widgetConfig.widgetType} -> Env ready to initialize widget.`) : pfCfDbg.log(`${widgetConfig.widgetType} -> Env not ready yet but initializing widget.`);
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
                        pfCfDbg.log(`${widgetConfig.widgetType} -> Error accessing AgentWorker. Env not ready yet but initializing widget.`, error);
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

                const CALLOUT_TRANSITION_MS = 250;

                function showCallout() {
                    if (isModalInitialized || !chatInfoBox || !config.properties.callout_enable) return;

                    setTimeout(() => {
                        if (isModalInitialized) return;

                        chatInfoBox.style.display = 'flex';
                        chatInfoBox.classList.remove('pf-cf-callout-visible');
                        chatInfoBox.offsetHeight;
                        requestAnimationFrame(() => {
                            chatInfoBox.classList.add('pf-cf-callout-visible');
                        });

                        if (config.properties.callout_hide_auto) {
                            setTimeout(() => {
                                hideCallout();
                            }, (config.properties.callout_hide_delay || 10) * 1000);
                        }
                    }, (config.properties.callout_delay || 5) * 1000);
                }

                function hideCallout() {
                    if (!chatInfoBox) return;

                    chatInfoBox.classList.remove('pf-cf-callout-visible');
                    setTimeout(() => {
                        chatInfoBox.style.display = 'none';
                    }, CALLOUT_TRANSITION_MS);
                }

                function showModal() {
                    const isPinned = localStorage.getItem(`pf_cf_pinned_${widgetConfig.token}`) === 'true';
                    const openOnInit = !!config.properties.modal_open_on_init;
                    if (widgetConfig.isPreview && !isPinned && !openOnInit) return;

                    if (isPinned || openOnInit) {
                        const delayMs = isPinned ? 0 : (Number(config.properties.modal_open_on_init_delay) || 0) * 1000;
                        setTimeout(() => {
                            if (!isModalInitialized) {
                                openModal();
                            }
                        }, delayMs);
                    }
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
                pfCfDbg.log(`PFCF Activation Components Script initialized for ${initConfig.token} -> ${initConfig.widgetType}`);
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
            pfCfDbg.log(`PFCF Activation Components Script initialized in DRAFT MODE for ${token} -> ${widgetType}`);
        };
    }


    // Optional: Run once-on-load initialization logic
    if (!window.pfCfActivators._initialized) {
        pfCfDbg.log('pfCfActivators initialized');
        window.pfCfActivators._initialized = true;
    }
})();
