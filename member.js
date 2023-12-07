function skillsMember() {
    return {
        restrict: 'E',
        scope: {
            skill: '='
        },
        templateUrl: 'js/directives/member.html'
    };
}