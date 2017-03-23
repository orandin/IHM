$(document).ready(function (){

    var listenJarbis = true;

    $('.toggleJarbis').click(function(){
        listenJarbis = !listenJarbis;
        console.log('listenJarbis switch to', listenJarbis);
        listenJarbis ? startJarbis() : stopJarbis();
    });

    var commands = [
        {
            indexes:["Bonjour", "Salut"],
            action:function(){
                artyom.say("Salut");
            }
        }, {
            indexes:["Au revoir", "Fermeture"],
            action:function(){
                artyom.say("A bientôt");
            }
        }, {
            indexes:["Peux-tu me trouver une route alternative"],
            action:function(){
                artyom.say("Bien sûr ! La voici. Tapotes sur ton volant 3 fois pour valider.");
            }
        }, {
            indexes:["J'ai besoin d'information"],
            action:function(){
                console.log('besoin info');
                $('.windshield').addClass('active');
            }
        }, {
            indexes:["Je n'ai pas besoin d'information"],
            action:function(){
                console.log('plus besoin info');
                $('.windshield').removeClass('active');
            }
        }
    ];

    for(var i = 0; i < commands.length; ++i){
        artyom.addCommands(commands[i]);
    }


    startJarbis();

    function startJarbis(){
        $('.state-jarbis').text('Etat Jarbis : activé');
        artyom.initialize({
            lang:"fr-FR",
            continuous:true,
            debug:true,
            listen:listenJarbis,
            speed:1,
            mode:"normal"
        });
    };

    function stopJarbis(){
        $('.state-jarbis').text('Etat Jarbis : desactivé');
        artyom.fatality();
    }




    /* ----------------------------------

    Functions

    ----------------------------------- */
    $('.wheel').click(function(){
        console.log('click on the wheel');
    });
});
