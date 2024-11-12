const singbox_conf = {
  "log": {
    "level": "info",
    "timestamp": true
  },
  "dns": {
    "servers": [
      {
        "tag": "google",
        "address": "tls://8.8.8.8"
      },
      {
        "tag": "cloudflare",
        "address": "https://1.1.1.1/dns-query"
      },
      {
        "tag": "local",
        "address": "223.5.5.5",
        "detour": "direct"
      },
      {
        "tag": "block",
        "address": "rcode://success"
      }
    ],
    "rules": [
      {
        "domain": ["geosite:category-ads-all"],
        "server": "block",
        "disable_cache": true
      },
      {
        "geosite": "cn",
        "server": "local"
      },
      {
        "geosite": "geolocation-!cn",
        "server": "google"
      }
    ],
    "strategy": "ipv4_only",
    "disable_cache": false,
    "disable_expire": false
  },
  "inbounds": [
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "127.0.0.1",
      "listen_port": 2080,
      "sniff": true,
      "sniff_override_destination": false,
      "domain_strategy": "ipv4_only"
    },
    {
      "type": "tun",
      "tag": "tun-in",
      "interface_name": "tun0",
      "inet4_address": "172.19.0.1/30",
      "mtu": 9000,
      "auto_route": true,
      "strict_route": true,
      "stack": "system",
      "sniff": true
    }
  ],
  "outbounds": [
    {
      "type": "selector",
      "tag": "proxy",
      "outbounds": [
        "auto",
        "direct",
        "{REPLACE-OUTBOUNDS-PROXY}"
      ]
    },
    {
      "type": "urltest",
      "tag": "auto",
      "outbounds": [
        "{REPLACE-OUTBOUNDS-AUTO}"
      ],
      "url": "https://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "type": "selector",
      "tag": "Netflix",
      "outbounds": [
        "proxy",
        "direct",
        "{REPLACE-OUTBOUNDS-NETFLIX}"
      ]
    },
    {
      "type": "selector",
      "tag": "Disney",
      "outbounds": [
        "proxy",
        "direct",
        "{REPLACE-OUTBOUNDS-DISNEY}"
      ]
    },
    {
      "type": "selector",
      "tag": "OpenAI",
      "outbounds": [
        "proxy",
        "direct",
        "{REPLACE-OUTBOUNDS-OPENAI}"
      ]
    },
    {
      "type": "selector",
      "tag": "Apple",
      "outbounds": [
        "proxy",
        "direct",
        "{REPLACE-OUTBOUNDS-APPLE}"
      ]
    },
    {
      "type": "selector",
      "tag": "Google",
      "outbounds": [
        "proxy",
        "direct",
        "{REPLACE-OUTBOUNDS-GOOGLE}"
      ]
    },
    {
      "type": "selector",
      "tag": "Microsoft",
      "outbounds": [
        "proxy",
        "direct",
        "{REPLACE-OUTBOUNDS-MICROSOFT}"
      ]
    },
    {
      "type": "selector",
      "tag": "Telegram",
      "outbounds": [
        "proxy",
        "direct",
        "{REPLACE-OUTBOUNDS-TELEGRAM}"
      ]
    },
    {
      "type": "selector",
      "tag": "Twitter",
      "outbounds": [
        "proxy",
        "direct",
        "{REPLACE-OUTBOUNDS-TWITTER}"
      ]
    },
    {
      "type": "direct",
      "tag": "direct"
    },
    {
      "type": "block",
      "tag": "block"
    },
    {
      "type": "dns",
      "tag": "dns-out"
    }
  ],
  "route": {
    "rules": [
      {
        "protocol": "dns",
        "outbound": "dns-out"
      },
      {
        "domain_suffix": [
          "openai.com",
          "ai.com",
          "anthropic.com",
          "claude.ai"
        ],
        "outbound": "OpenAI"
      },
      {
        "domain": [
          "geosite:netflix"
        ],
        "outbound": "Netflix"
      },
      {
        "domain": [
          "geosite:disney"
        ],
        "outbound": "Disney"
      },
      {
        "domain": [
          "geosite:google"
        ],
        "outbound": "Google"
      },
      {
        "domain": [
          "geosite:microsoft"
        ],
        "outbound": "Microsoft"
      },
      {
        "domain": [
          "geosite:telegram"
        ],
        "outbound": "Telegram"
      },
      {
        "domain": [
          "geosite:twitter"
        ],
        "outbound": "Twitter"
      },
      {
        "domain": [
          "geosite:apple"
        ],
        "outbound": "Apple"
      },
      {
        "domain": [
          "geosite:category-ads-all"
        ],
        "outbound": "block"
      },
      {
        "geosite": "cn",
        "geoip": "cn",
        "outbound": "direct"
      },
      {
        "geosite": "geolocation-!cn",
        "outbound": "proxy"
      }
    ],
    "auto_detect_interface": true,
    "override_android_vpn": true
  },
  "experimental": {
    "clash_api": {
      "external_controller": "127.0.0.1:9090",
      "external_ui": "ui",
      "external_ui_download_url": "",
      "external_ui_download_detour": "",
      "secret": "",
      "default_mode": "rule",
      "store_selected": true,
      "cache_file": "",
      "cache_id": ""
    }
  }
};

export default singbox_conf;
