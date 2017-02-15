var Yike=angular.module('Yike',['ngRoute']);
//配置路由
Yike.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/today',{
		templateUrl:'./views/today.html',
		controller:'TodayCtrl'
	}).when('/like',{
		templateUrl:'./views/like.html'
	}).when('/older',{
		templateUrl:'./views/older.html'
	}).when('/categroy',{
		templateUrl:'./views/categroy.html'
	}).when('/settings',{
		templateUrl:'./views/settings.html'
	}).when('/author',{
		templateUrl:'./views/author.html'
	})
}])
//定义全局变量 并创建运行块

Yike.run(['$rootScope',function($rootScope){
	$rootScope.collapsed=false;
	$rootScope.collapse=function(){
//		alert(1);
	$rootScope.collapsed=!$rootScope.collapsed;
	//获取所有的dd  设置过渡效果
	var dds=document.querySelectorAll('.navs dd');
	if($rootScope.collapsed) {
		for(var i=0;i<dds.length;i++){
			dds[i].style.transform='translate(0)';
			dds[i].style.transitionDelay='0.2s';
			dds[i].style.transitionDuration=(i+1)*0.25 +'s';
			
		}
	}else {
		for(var j=dds.length-1;j>=0;j--){
				dds[j].style.transitionDelay='';
				dds[j].style.transform='translate(-100%)';
				dds[j].style.transitionDuration=(dds.length-j+1)*0.25 +'s';
		}
	}
	}
}]);
//定义控制器
Yike.controller('NavsCtrl',['$scope',function($scope){
	$scope.navs=[
	{text:'开心一刻',link:'#/today',icon:'icon-home'},
	{text:'回首往事',link:'#/older',icon:'icon-file-empty'},
	{text:'最近关注',link:'#/author',icon:'icon-pencil'},
	{text:'栏目收藏',link:'#/categroy',icon:'icon-menu'},
	{text:'我的秘密',link:'#/like',icon:'icon-menu'},
	{text:'设置',link:'#/settings',icon:'icon-menu'}
	]
	
}]);
//定义一个个控制器
Yike.controller('TodayCtrl',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	//发送请求
	$rootScope.loaded = false;
	$http({
		url:'./api/today.php'
	}).success(function(info){
		console.log(info)
		$scope.posts=info.posts;
		$scope.date=info.date;
		$rootScope.loaded = true;
		$rootScope.key=0;
	})
}])
