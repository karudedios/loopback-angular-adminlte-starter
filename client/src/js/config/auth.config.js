export default function authConfig($httpProvider) {

  $httpProvider.interceptors.push(function ($q, $location, LoopBackAuth) {
    return {
      responseError: function (rejection) {
        if (rejection.status == 401) {
          //Now clearing the loopback values from client browser for safe logout...
          LoopBackAuth.clearUser();
          LoopBackAuth.clearStorage();
          $location.nextAfterLogin = $location.path();
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  });

}