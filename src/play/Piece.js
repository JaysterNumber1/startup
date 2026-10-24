export class Piece {

    constructor(id, type, player, promoted = false) {
        this.id = id;
        this.type = type;
        this.player = player;
        this.promoted = promoted;
    }

    promote() {
        const promotionMap = {
            '歩': 'と',
            '香': '杏',
            '桂': '圭',
            '銀': '全',
            '飛': '竜',
            '角': '馬'
        };

        if (promotionMap[this.type] && !this.promoted) {
            this.type = promotionMap[this.type];
            this.promoted = true;
        }

    };

    demote() {
        const demotionMap = {
            'と': '歩',
            '杏': '香',
            '圭': '桂',
            '全': '銀',
            '竜': '飛',
            '馬': '角'
        };

        if (demotionMap[this.type] && this.promoted) {
            this.type = demotionMap[this.type];
            this.promoted = false;
        }

    };

    capture(newOwner) {
        this.demote();
        this.player = newOwner;
    }
}