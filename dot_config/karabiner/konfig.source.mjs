#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

/*
 * =========================
 * User Editable Section
 * =========================
 * Edit conditions and rules below.
 * Optional per-rule toggle: enabled: false
 * The generator functions start after this section.
 */

const USER_OUTPUT = {
  karabinerPath: "karabiner.json",
  profileIndex: 0,
  defaultParameters: {
    "basic.to_if_alone_timeout_milliseconds": 500,
  },
};

const USER_CONDITIONS = {
  DEVICE_APPLE_KEYBOARD: [
    {
      type: "device_if",
      identifiers: [{ vendor_id: 1452 }, { vendor_id: 76 }, { is_built_in_keyboard: true }],
    },
  ],
  APPS_BROWSERS_IF: [
    {
      type: "frontmost_application_if",
      bundle_identifiers: [
        "^com.google.Chrome$",
        "^org.mozilla.firefox$",
        "^org.mozilla.floorp$",
        "^app.zen-browser.zen$",
      ],
    },
  ],
  APPS_EXCLUDED_PC_SHORTCUTS_UNLESS: [
    {
      type: "frontmost_application_unless",
      bundle_identifiers: [
        "^com\\.microsoft\\.rdc\\.macos$",
        "^com\\.microsoft\\.VSCode$",
        "^com\\.mitchellh\\.ghostty$",
        "^dev\\.zed\\.Zed$",
        "^com\\.cmuxterm\\.app$",
        "^com\\.moonlight-stream\\.Moonlight$",
      ],
    },
  ],
};

const USER_RULES = [
  {
    key: "browser_nav__f5",
    description: "web browser: f5 to refresh",
    from: "f5",
    to: [{ key_code: "r", modifiers: ["left_command"] }],
    conditionsRef: "APPS_BROWSERS_IF",
  },
  {
    key: "browser_nav__lopt_h",
    description: "web browser: alt+H to back history",
    from: "left_option h",
    to: [{ key_code: "open_bracket", modifiers: ["left_command"] }],
    conditionsRef: "APPS_BROWSERS_IF",
  },
  {
    key: "browser_nav__lopt_l",
    description: "web browser: alt+L to go forward history",
    from: "left_option l",
    to: [{ key_code: "close_bracket", modifiers: ["left_command"] }],
    conditionsRef: "APPS_BROWSERS_IF",
  },
  {
    key: "caps_hyper__caps_lock_any",
    description: "Caps Lock to Hyper (tap for F19)",
    from: "caps_lock|any",
    to: [
      {
        key_code: "left_shift",
        modifiers: ["left_command", "left_control", "left_option"],
      },
    ],
    to_if_alone: [{ key_code: "f19" }],
  },
  {
    key: "delete_word__lctrl_backspace",
    description: "PC style delete last word",
    from: "left_control delete_or_backspace",
    to: [{ key_code: "delete_or_backspace", modifiers: ["left_option"] }],
  },
  {
    key: "hyper_aeud__lshift_lcmd_lctrl_lopt_a_any",
    description: "Hyper+A to Home",
    from: "left_shift left_command left_control left_option a|any",
    to: [{ key_code: "home" }],
  },
  {
    key: "hyper_aeud__lshift_lcmd_lctrl_lopt_d_any",
    description: "Hyper+D to Page Down",
    from: "left_shift left_command left_control left_option d|any",
    to: [{ key_code: "page_down" }],
  },
  {
    key: "hyper_aeud__lshift_lcmd_lctrl_lopt_e_any",
    description: "Hyper+E to End",
    from: "left_shift left_command left_control left_option e|any",
    to: [{ key_code: "end" }],
  },
  {
    key: "hyper_aeud__lshift_lcmd_lctrl_lopt_u_any",
    description: "Hyper+U to Page Up",
    from: "left_shift left_command left_control left_option u|any",
    to: [{ key_code: "page_up" }],
  },
  {
    key: "hyper_backspace__lshift_lcmd_lctrl_lopt_backspace_any",
    description: "Hyper+Backspace to Delete Forward",
    from: "left_shift left_command left_control left_option delete_or_backspace|any",
    to: [{ key_code: "delete_forward" }],
  },
  {
    key: "hyper_hjkl__lshift_lcmd_lctrl_lopt_h_any",
    description: "Hyper+H to Left Arrow",
    from: "left_shift left_command left_control left_option h|any",
    to: [{ key_code: "left_arrow" }],
  },
  {
    key: "hyper_hjkl__lshift_lcmd_lctrl_lopt_j_any",
    description: "Hyper+J to Down Arrow",
    from: "left_shift left_command left_control left_option j|any",
    to: [{ key_code: "down_arrow" }],
  },
  {
    key: "hyper_hjkl__lshift_lcmd_lctrl_lopt_k_any",
    description: "Hyper+K to Up Arrow",
    from: "left_shift left_command left_control left_option k|any",
    to: [{ key_code: "up_arrow" }],
  },
  {
    key: "hyper_hjkl__lshift_lcmd_lctrl_lopt_l_any",
    description: "Hyper+L to Right Arrow",
    from: "left_shift left_command left_control left_option l|any",
    to: [{ key_code: "right_arrow" }],
  },
  {
    key: "hyper_tab__lshift_lcmd_lctrl_lopt_tab_any",
    description: "Hyper+Tab to Caps Lock",
    from: "left_shift left_command left_control left_option tab|any",
    to: [{ key_code: "caps_lock" }],
  },
  {
    key: "paste_plain__lctrl_lopt_lshift_v",
    description: "ctrl+alt+shift+v to paste without format",
    from: "left_control left_option left_shift v",
    to: [{ key_code: "v", modifiers: ["left_command", "left_option", "left_shift"] }],
  },
  {
    key: "pc_shortcuts__f3",
    description: "F3 to Command+G",
    from: "f3",
    to: [{ key_code: "g", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_a",
    description: "Ctrl+A to Command+A",
    from: "left_control a",
    to: [{ key_code: "a", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_b",
    description: "Ctrl+B to Command+B",
    from: "left_control b",
    to: [{ key_code: "b", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_c",
    description: "Ctrl+C to Command+C",
    from: "left_control c",
    to: [{ key_code: "c", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_f",
    description: "Ctrl+F to Command+F",
    from: "left_control f",
    to: [{ key_code: "f", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_f3",
    description: "Ctrl+F3 to Command+Shift+G",
    from: "left_control f3",
    to: [{ key_code: "g", modifiers: ["left_command", "left_shift"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_g",
    description: "Ctrl+G to Command+G",
    from: "left_control g",
    to: [{ key_code: "g", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_i",
    description: "Ctrl+I to Command+I",
    from: "left_control i",
    to: [{ key_code: "i", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_s",
    description: "Ctrl+S to Command+S",
    from: "left_control s",
    to: [{ key_code: "s", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_t",
    description: "Ctrl+T to Command+T",
    from: "left_control t",
    to: [{ key_code: "t", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_u",
    description: "Ctrl+U to Command+U",
    from: "left_control u",
    to: [{ key_code: "u", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_v",
    description: "Ctrl+V to Command+V",
    from: "left_control v",
    to: [{ key_code: "v", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_x",
    description: "Ctrl+X to Command+X",
    from: "left_control x",
    to: [{ key_code: "x", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_y",
    description: "Ctrl+Y to Command+Shift+Z",
    from: "left_control y",
    to: [{ key_code: "z", modifiers: ["left_command", "left_shift"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "pc_shortcuts__lctrl_z",
    description: "Ctrl+Z to Command+Z",
    from: "left_control z",
    to: [{ key_code: "z", modifiers: ["left_command"] }],
    conditionsRef: "APPS_EXCLUDED_PC_SHORTCUTS_UNLESS",
  },
  {
    key: "quit_guard__lcmd_q",
    description: "Disable Command+Q",
    from: "left_command q",
    to: [{ key_code: "out" }],
  },
  {
    key: "quit_guard__lopt_f4",
    description: "Option+F4 to Command+Q",
    from: "left_option f4",
    to: [{ key_code: "q", modifiers: ["left_command"] }],
  },
  {
    key: "rshift_f18__rshift_any",
    description: "Right Shift tap for F18 (hold for Right Shift)",
    from: "right_shift|any",
    to: [{ key_code: "right_shift" }],
    to_if_alone: [{ key_code: "f18", modifiers: [] }],
  },
  {
    key: "swap_opt_cmd__lcmd_any",
    description: "Swap left command to left option (Apple keyboards)",
    from: "left_command|any",
    to: [{ key_code: "left_option" }],
    conditionsRef: "DEVICE_APPLE_KEYBOARD",
  },
  {
    key: "swap_opt_cmd__lopt_any",
    description: "Swap left option to left command (Apple keyboards)",
    from: "left_option|any",
    to: [{ key_code: "left_command" }],
    conditionsRef: "DEVICE_APPLE_KEYBOARD",
  },
  {
    key: "swap_opt_cmd__rcmd_any",
    description: "Map right command to escape",
    from: "right_command|any",
    to: [{ key_code: "escape" }],
  },
  {
    key: "swap_opt_cmd__ropt_any",
    description: "Map right option to F17",
    from: "right_option|any",
    to: [{ key_code: "f17" }],
  },
  {
    key: "tab_ops__lopt_lctrl_h",
    description: "ctrl+alt+h to go to previous tab",
    from: "left_option left_control h",
    to: [{ key_code: "tab", modifiers: ["left_control", "left_shift"] }],
  },
  {
    key: "tab_ops__lopt_lctrl_l",
    description: "ctrl+alt+l to go to next tab",
    from: "left_option left_control l",
    to: [{ key_code: "tab", modifiers: ["left_control"] }],
  },
  {
    key: "tab_ops__lopt_lctrl_t",
    description: "ctrl+alt+t to create new tab",
    from: "left_option left_control t",
    to: [{ key_code: "t", modifiers: ["left_command"] }],
  },
  {
    key: "tab_ops__lopt_lctrl_w",
    description: "ctrl+alt+w to close tab",
    from: "left_option left_control w",
    to: [{ key_code: "w", modifiers: ["left_command"] }],
  },
];

/*
 * =========================
 * Generator Section
 * =========================
 */

const parseArgs = (argv) => {
  const args = {
    karabinerPath: path.resolve(process.cwd(), USER_OUTPUT.karabinerPath),
    check: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--karabiner" && argv[i + 1]) {
      args.karabinerPath = path.resolve(process.cwd(), argv[++i]);
      continue;
    }
    if (argv[i] === "--check") {
      args.check = true;
    }
  }

  return args;
};

const parseFrom = (from) => {
  const [left, optionalPart] = from.split("|");
  const tokens = left.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) throw new Error(`Invalid from string: ${from}`);

  const keyCode = tokens[tokens.length - 1];
  const mandatory = tokens.slice(0, -1);
  const optional = optionalPart ? optionalPart.trim().split(/\s+/).filter(Boolean) : [];

  const modifiers = {
    ...(mandatory.length ? { mandatory } : {}),
    ...(optional.length ? { optional } : {}),
  };

  return {
    key_code: keyCode,
    ...(Object.keys(modifiers).length ? { modifiers } : {}),
  };
};

const resolveConditions = (rule) => {
  if (rule.conditions && rule.conditionsRef) {
    throw new Error(`Rule ${rule.key} cannot have both conditions and conditionsRef`);
  }

  if (rule.conditionsRef) {
    const conditions = USER_CONDITIONS[rule.conditionsRef];
    if (!conditions) {
      throw new Error(`Rule ${rule.key} references unknown conditionsRef: ${rule.conditionsRef}`);
    }
    return conditions;
  }

  return rule.conditions || undefined;
};

const validateRule = (rule) => {
  if (!rule.key || typeof rule.key !== "string") {
    throw new Error(`Invalid rule key: ${JSON.stringify(rule)}`);
  }
  if (!rule.from || typeof rule.from !== "string") {
    throw new Error(`Rule ${rule.key} must provide from as string`);
  }
  if (!Array.isArray(rule.to) || rule.to.length === 0) {
    throw new Error(`Rule ${rule.key} must provide non-empty to array`);
  }
};

const compileManipulator = (rule) => {
  const { key, conditionsRef, description, enabled, ...rest } = rule;
  const conditions = resolveConditions(rule);

  const manipulator = {
    type: "basic",
    ...rest,
    ...(conditions ? { conditions } : {}),
  };

  if (typeof manipulator.from === "string") {
    manipulator.from = parseFrom(manipulator.from);
  }

  return manipulator;
};

const compileKarabinerRules = (rules) => {
  const seen = new Set();
  const activeRules = rules.filter((rule) => rule.enabled !== false);

  return activeRules.map((rule) => {
    validateRule(rule);
    if (seen.has(rule.key)) {
      throw new Error(`Duplicate rule key: ${rule.key}`);
    }
    seen.add(rule.key);

    const manipulator = compileManipulator(rule);
    return {
      description: rule.description || rule.key,
      manipulators: [manipulator],
    };
  });
};

const ensureProfile = (karabiner, profileIndex) => {
  if (!Array.isArray(karabiner.profiles)) {
    karabiner.profiles = [];
  }
  while (karabiner.profiles.length <= profileIndex) {
    karabiner.profiles.push({});
  }

  const profile = karabiner.profiles[profileIndex];
  if (!profile.complex_modifications) {
    profile.complex_modifications = {};
  }
  if (!profile.complex_modifications.parameters) {
    profile.complex_modifications.parameters = { ...USER_OUTPUT.defaultParameters };
  }

  return profile;
};

const writeKarabiner = (compiledRules, karabinerPath, profileIndex) => {
  let karabiner = {};
  if (fs.existsSync(karabinerPath)) {
    karabiner = JSON.parse(fs.readFileSync(karabinerPath, "utf-8"));
  }

  const profile = ensureProfile(karabiner, profileIndex);
  profile.complex_modifications.rules = compiledRules;

  fs.writeFileSync(karabinerPath, `${JSON.stringify(karabiner, null, 2)}\n`);
  return profile.complex_modifications.rules.length;
};

const main = () => {
  const args = parseArgs(process.argv.slice(2));
  const compiledRules = compileKarabinerRules(USER_RULES);

  if (args.check) {
    console.log(`check: ok (${compiledRules.length} enabled rules)`);
    return;
  }

  const count = writeKarabiner(compiledRules, args.karabinerPath, USER_OUTPUT.profileIndex);
  console.log(`karabiner: ${count} rules -> ${args.karabinerPath}`);
};

main();
