angular.module('utils', [])
	.service('Utils', function() {
		this.SERVICES = [
		  {code: 'change-tires', name: 'Change tires' }, 
		  {code: 'change-oil', name: 'Change oil' },
		  {code: 'car-inspection', name: 'Car inspection'},
		  {code: 'check-breaks', name: 'Check breaks'}, 
		  {code: 'check-battery', name: 'Check battery'}
		];
		
		this.searchResults = [];

	});