// angular 的controller 在注册时,函数的形参顺序可以随便填,觉得很神奇,就自己研究实现另一个

const instance = {
	$scope: '我是$scope',
	$state: '我是$state',
	$timeout: '我是$timeout',
	$uibModal: '我是$uibModal'
}

let FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m
let FN_ARG_SPLIT = /,/
let FN_ARG = /^\s*(_?)(\S+?)\1\s*$/

const fnText = test.toString()
const args = fnText.match(FN_ARGS)[1].replace(/[\s\r\n]+/, ' ')

const $inject = []
args.split(FN_ARG_SPLIT).forEach((item) => {
	item.replace(FN_ARG, (_, __, c) => {
		$inject.push(instance[c])
	})
})

function test($state, $scope, $uibModal, $timeout) {
	console.log(this.arguments)
}

function test($scope, $state, $timeout, $uibModal) {
	console.log(this.arguments)
}

test.apply(test, $inject)
