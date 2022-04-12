"use strict";
exports.__esModule = true;
exports.getLinkedListLength = exports.generateListNodeByArr = exports.ListNode = void 0;
var ListNode = /** @class */ (function () {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }
    ListNode.prototype.setNext = function (node) {
        this.next = node;
        return node;
    };
    return ListNode;
}());
exports.ListNode = ListNode;
function generateListNodeByArr(arr) {
    var linkedList = null;
    var preListNode = null;
    for (var i = 0, len = arr.length; i < len; i++) {
        var currentNode = new ListNode(arr[i]);
        if (!linkedList) {
            linkedList = currentNode;
        }
        else {
            preListNode.setNext(currentNode);
        }
        preListNode = currentNode;
    }
    return linkedList;
}
exports.generateListNodeByArr = generateListNodeByArr;
function getLinkedListLength(linkedList) {
    var len = 0;
    var currentNode = linkedList;
    while (currentNode) {
        len++;
        currentNode = currentNode.next;
    }
    return len;
}
exports.getLinkedListLength = getLinkedListLength;
