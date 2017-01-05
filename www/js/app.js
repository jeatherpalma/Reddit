
(function(){var app = angular.module('starter', ['ionic','angularMoment'])

    //Se escribe un controler por cada pantalla
    app.controller('Red_Control',function($scope, $http){
        //Con scope creamos una variable que se puden usar en el index
        $scope.posts=[]
        //http.get para realizar una peticion get a la url
        $http.get('https://www.reddit.com/r/sports/new.json').success(
            function(posts){
                //console.log(post);
                /*Si es efectiva la peticion realizamos con la funcion
                angular.forEach la cual realiza un ciclo en el objeto
                que se encuentra contenido en posts.data.children de la pagina
                */
                angular.forEach(posts.data.children,function(post){
                    //con push mandamos el objeto que se encuentra giardado en post
                    $scope.posts.push(post.data);
                });
            });
        
        //Funcion que carga post viejos
        $scope.cargarViejos = function(){
            
            var parametro={};
            if($scope.posts.length>0)
            {
                    parametro['after'] = $scope.posts[$scope.posts.length-1].name;
            }
            
            $http.get('https://www.reddit.com/r/sports/new.json',{params:parametro}).success(
            function(posts){
                //console.log(post);
                /*Si es efectiva la peticion realizamos con la funcion
                angular.forEach la cual realiza un ciclo en el objeto
                que se encuentra contenido en posts.data.children de la pagina
                */
                angular.forEach(posts.data.children,function(post){
                    //con push mandamos el objeto que se encuentra giardado en post
                    $scope.posts.push(post.data);
                });
                 $scope.$broadcast('scroll.infiniteScrollComplete');
            });    
        };//Fin del evento que recarga
        
        $scope.cargarNuevos = function()
        {
            if($scope.posts.length>0)
            {
                var parametro={'before':$scope.posts[0].name};
            }else
            {
                 return;   
            }
            $http.get('https://www.reddit.com/r/sports/new.json',{params:parametro}).success(
            function(posts){
                
                //CReamos una variable que tendrá los nuevos post 
                var newPost = [];
                
                angular.forEach(posts.data.children,function(post){

                    newPost.push(post.data);
                });
                $scope.posts = newPost.concat($scope.posts);
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
       
        $scope.openLink = function(url)
        {
            window.open(url, '_blank');
        };
        
    });//Fin del controller
            
    //Inicio de la aplicacion
    app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
     
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.cordova && window.cordova.InAppBrowser)
        {
            window.open = window.cordova.InAppBrowser.open;
        }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
        
})}());