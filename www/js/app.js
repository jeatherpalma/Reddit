
(function(){var app = angular.module('starter', ['ionic'])

    //Se escribe un controler por cada pantalla
    app.controller('Red_Control',function($scope, $http){
        //Con scope creamos una variable que se puden usar en el index
        $scope.posts=[]
        //http.get para realizar una peticion get a la url
        $http.get('https://www.reddit.com/r/sports.json').success(
            function(posts){
                //console.log(post);
                /*Si es efectiva la peticion realizamos con la funcion
                angular.forEach la cual realiza un ciclo en el objeto
                que se encuentra contenido en posts.data.children de la pagina
                */
                angular.forEach(posts.data.children,function(post){
                    //con push mandamos el objeto que se encuentra giardado en post
                    $scope.posts.push(post.data);
                })
            });
    });
            
    //Inicio de la aplicacion
    app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
     
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
        
})}());