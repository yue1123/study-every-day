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

test.apply(test, $inject)