import alt from 'alt';

let cmdHandlers = {};

function invokeCmd(player, cmd, args) {
    const callback = cmdHandlers[cmd];

    if (callback) {
        callback(player, args);
    } else {
        send(player, `{FF0000} Unknown command /${cmd}`);
    }
}

alt.onClient('chatmessage', (player, msg) => {
    if (msg[0] === '/') {
        msg = msg.trim().slice(1);

        if (msg.length > 0) {
            alt.log('[chat:cmd] ' + player.name + ': /' + msg);

            let args = msg.split(' ');
            let cmd = args.shift();

            invokeCmd(player, cmd, args);
        }
    } else {
        msg = msg.trim();

        if (msg.length <= 0) return;

        alt.log('[==> CHAT] ' + player.name + ': ' + msg);

        alt.emitClient(
            null,
            'chatmessage',
            player.name,
            msg
                .replace(/</g, '&lt;')
                .replace(/'/g, '&#39')
                .replace(/"/g, '&#34')
        );
    }
});

export function send(player, msg) {
    alt.emitClient(player, 'chatmessage', null, msg);
}

export function broadcast(msg) {
    send(null, msg);
}

export function registerCmd(cmd, callback) {
    if (cmdHandlers[cmd] !== undefined) {
        alt.logError(`Failed to register command /${cmd}, already registered`);
    } else {
        cmdHandlers[cmd] = callback;
    }
}

// Formatting for in-chat debug messages.
export function success(message) {
    broadcast(`{00FF00}[Success] ${message}`);
}

export function info(message) {
    broadcast(`{FFAB0F}[Info] ${message}`);
}

export function warning(message) {
    broadcast(`{FF8989}[Warning] ${message}`);
}

export function error(message) {
    broadcast(`{FF0000}[Error] ${message}`);
}

export function debug(message) {
    broadcast(`{FF00FF}[Debug] ${message}`);
}

// Used in an onConnect function to add functions to the player entity for a seperate resource.
export function setupPlayer(player) {
    player.sendMessage = msg => {
        send(player, msg);
    };
}

// Arbitrary events to call.
alt.on('sendChatMessage', (player, msg) => {
    send(player, msg);
});

alt.on('broadcastMessage', msg => {
    send(null, msg);
});

export default {
    send,
    broadcast,
    registerCmd,
    setupPlayer,
    success,
    info,
    warning,
    error,
    debug
};
