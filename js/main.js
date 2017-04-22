$(document).ready(function (){

    /**
        COMMON;
    */
    var listenJarbis = true;
    var currentScenario = 'Aucun scénario actif';
    var step = 0;

    $('.toggleJarbis').click(function(){
        listenJarbis = !listenJarbis;
        console.log('listenJarbis switch to', listenJarbis);
        listenJarbis ? startJarbis() : stopJarbis();
    });

    /**
        SCENARIO FATIGUE;
    */
    var SCENARIO_FATIGUE = 'FATIGUE';

    $('.scenario-fatigue').click(function(){
        changeScenario(SCENARIO_FATIGUE);
        console.log('Début du scénario fatigue');
        $('.windshield').removeClass('active');
        step = 0;
        //Après 5 secondes, délenchement d'un premier événement.
        setTimeout(function(){
            artyom.say("Attention ! J'ai détecté un niveau de fatigue élevé, vous devriez songer à vous arrêter pour vous reposer.");
            $('.bkgd-car').addClass('wiggle');
            step++;
        }, 5000);

        setTimeout(function(){
            $('.bkgd-car').removeClass('wiggle');
        }, 7000);

        //Après 20 secondes, déclenchement d'un second événement
        setTimeout(function(){

            if(step === 1){
                artyom.say("Attention ! Vous avez choisi de ne pas vous arrêter et les signes de fatigue s'agravent. Vous mettez votre vie en danger. Voulez-vous que je vous dirige vers une aire de repos?");
                $('.bkgd-car').addClass('wiggle');
                step++;
            }

            var commandeArret = {
                indexes:["Oui", "Ouais", "Non", "Plus tard"],
                action:function(i){
                    if(step === 2){
                        switch (i) {
                            case 0: case 1:
                                artyom.say("Recherche en cours ...");
                                artyom.say("Vous trouverez une aire de repos à 850m. Voulez-vous passer en pilote automatique ?");
                                $('.windshield').addClass('active');
                                step = 4;
                                break;
                            default:
                                artyom.say("Très bien, en revanche lors du prochain avertissement, je passerai en pilote automatique");
                                step = 3;
                                fatigue_piloteAutoForce();
                                break;
                        }

                    }
                }
            }

            artyom.addCommands(commandeArret);
        }, 20000);
    });

    $('.wheel-left-top').click(function(){
        fatigue_refus();
    });
    $('.wheel-left-bottom').click(function(){
        fatigue_refus();
    });
    $('.wheel-right-top').click(function(){
        fatigue_validation();
    });
    $('.wheel-right-bottom').click(function(){
        fatigue_validation();
    });

    function fatigue_refus(){
        if(currentScenario === SCENARIO_FATIGUE && step === 4){
            console.log('refus');
            step = -1;
            fatigue_piloteAutoForce();
        }
    }

    function fatigue_piloteAutoForce(){
        setTimeout(function(){
            artyom.say("Attention ! Par précaution, passage en mode pilote automatique. Arrêt du véhicule programmé à l'aire de repos la plus proche.");
            console.log('fin du scénario de fatigue');
            changeScenario();
        }, 5000);
    }

    function fatigue_validation(){
        if(currentScenario === SCENARIO_FATIGUE && step === 4){
            console.log('validation');
            step = -1;
            artyom.say("Passage en mode pilote automatique. Vous arriverez à destination dans 2 minutes.");
            console.log('fin du scénario de fatigue');
            changeScenario();
        }
    }
	
	/**
        SCENARIO ESSENCE;
    */
    var SCENARIO_ESSENCE = 'ESSENCE';
	
	$('.scenario-essence').click(function(){
        changeScenario(SCENARIO_ESSENCE);
        console.log('Début du scénario essence');
        $('.windshield').removeClass('active');
        step = 0;
        //Après 5 secondes, délenchement d'un premier événement.
        setTimeout(function(){
            artyom.say("Votre jauge d'essence est actuellement très basse.");
			artyom.say("Tapotez sur la gauche de votre volant pour continuer votre trajet.");
			artyom.say("Tapotez sur la droite de votre volant pour que je vous guide jusqu'à la station la plus proche.");
            $('.bkgd-car').addClass('wiggle');
        }, 5000);

        setTimeout(function(){
            $('.bkgd-car').removeClass('wiggle');
        }, 7000);
        
    });
	
	$('.wheel-left-top').click(function(){
		if(step === 0) {
			essence_refus();
		}
		if(step === 1) {
			esso_validation();
		}
    });
	
	$('.wheel-right-top').click(function(){
		if(step === 1) {
			total_validation();
		}
		if(step === 0) {
			essence_validation();
		}
    });
	
	function essence_refus(){
        if(currentScenario === SCENARIO_ESSENCE && step === 0){
            console.log('refus');
            step = -1;
            artyom.say("Faites attention, il ne vous reste que 10 kilomètres à parcourir avant de tomber en panne.");
			console.log('fin du scénario de fatigue');
            changeScenario();
        }
    }
	
	function essence_validation(){
        if(currentScenario === SCENARIO_ESSENCE && step === 0){
            console.log('validation');
            step = 1;
            artyom.say("J'ai trouvé deux stations à proximité.");
			artyom.say("Tapotez sur la gauche du volant pour que je vous mène à la station Esso, un peu plus éloignée mais beaucoup moins fréquentée.");
			artyom.say("Tapotez sur la droite du volant pour que je vous mène à la station Total; beaucoup plus fréquentée.");
			artyom.say("Le temps d'attente peut être supérieur à 10 minutes.");
        }
    }
	
	function esso_validation() {
		if(currentScenario === SCENARIO_ESSENCE && step === 1){
			console.log('validation_esso');
            step = -1;
			artyom.say("Confirmation de la validation de la station Esso.");
			artyom.say("Continuez tout droit. La station se trouve à deux kilomètres.");
			console.log('fin du scénario essence');
            changeScenario();
		}
	}
	
	function total_validation() {
		if(currentScenario === SCENARIO_ESSENCE && step === 1){
			console.log('validation_esso');
            step = -1;
			artyom.say("Confirmation de la validation de la station Total.");
			artyom.say("Prenez la prochaine à droite. La station se trouve à 500 mètres.");
			console.log('fin du scénario essence');
            changeScenario();
		}
	}
	
	/**
        SCENARIO EMBOUTEILLAGE;
    */
    var SCENARIO_EMBOUTEILLAGE = 'EMBOUTEILLAGE';

    $('.scenario-embouteillage').click(function(){
		changeScenario(SCENARIO_EMBOUTEILLAGE);
        console.log('Début du scénario prévention embouteillage');
        $('.windshield').removeClass('active');
        step = 0;
        //Après 5 secondes, délenchement d'un premier événement.
		setTimeout(function(){
            artyom.say("Un embouteillage a été détecté sur votre itinéraire.");
			artyom.say("Souhaitez-vous que je recherche un trajet alternatif ?");
            $('.bkgd-car').addClass('wiggle');
			
			var commande = {
                indexes:["Oui", "Ouais", "Non", "Plus tard", "Pas tout de suite"],
                action:function(i){
                    switch (i) {
                        case 0: case 1:
							if(step === 0) {
								artyom.say("Recherche en cours ...");
								artyom.say("J'ai trouvé un trajet alternatif. Celui ci vous fait gagner 10 minutes.");
								artyom.say("Souhaitez-vous suivre cet itinéraire ?");
								step = -1;
							} else {
								artyom.say("Confirmation");
								$('.windshield').addClass('active');
								artyom.say("Suivez les indications sur le pare-brise.");
								console.log('fin du scénario de prévention des embouteillages');
								changeScenario();
							}
							step = 1;
                            break;
                        default:
                            artyom.say("Très bien. Je vous souhaite alors une bonne route et un bon courage.");
                            step = 2;
							console.log('fin du scénario de prévention des embouteillages');
							changeScenario();
                            break;
                    }
                }
            }
			
            artyom.addCommands(commande);
        }, 5000);
		
		setTimeout(function(){
            $('.bkgd-car').removeClass('wiggle');
        }, 7000);
	});
	
	$('.wheel-left-top').click(function(){
        embouteillage_refus();
    });
    $('.wheel-right-top').click(function(){
        embouteillage_validation();
    });

    function embouteillage_refus(){
        if(currentScenario === SCENARIO_EMBOUTEILLAGE && step === 0){
            console.log('refus trajet alternatif');
            step = -1;
			artyom.say("Très bien. Je vous souhaite alors une bonne route et un bon courage.");
			console.log('fin du scénario de prévention des embouteillages');
            changeScenario();
        }
    }

    function embouteillage_validation(){
        if(currentScenario === SCENARIO_EMBOUTEILLAGE && step === 0){
            console.log('validation trajet alternatif');
            step = -1;
            artyom.say("Recherche en cours ...");
            artyom.say("J'ai trouvé une route alternative");
			artyom.say("Je vous l'affiche tout de suite");
			artyom.say("Vous arriverez à destination dans 17 minutes");
            $('.windshield').addClass('active');
            console.log('fin du scénario de prévention des embouteillages');
            changeScenario();
        }
    }
	
	/**
        SCENARIO PARKING;
    */
    var SCENARIO_PARKING = 'PARKING';
	
	$('.scenario-parking').click(function(){
		changeScenario(SCENARIO_PARKING);
        console.log('Début du scénario recherche parking');
        $('.windshield').removeClass('active');
        step = 0;
        //Après 5 secondes, délenchement d'un premier événement.
		setTimeout(function(){
            artyom.say("Bonjour Tony. Que puis-je faire pour vous en cette belle journée ?");
            $('.bkgd-car').addClass('wiggle');
			
			var commande = {
                indexes:["Recherche parking gratuit", "Oui", "Ouais", "Non", "Non merci", "Non merci Jarbis", "Ce sera tout", "Ce sera tout Jarbis", "Pas pour l'instant", "Pas pour le moment"],
                action:function(i){
                    switch (i) {
                        case 0:
							artyom.say("Recherche du parking gratuit le plus proche en cours.");
							artyom.say("J'ai bien peur qu'il n'y ait pas de parking dans le coin.");
							artyom.say("Cependant, il y a une place libre dans une rue proche d'ici.");
							artyom.say("Voulez-vous que je vous y amène ?");
							break;
						case 1: case 2:
							artyom.say("Dans ce cas, prenez la première à droite.");
							artyom.say("Il y aura une place libre devant le marchand de fruits et légumes.")
							artyom.say("Souhaitez-vous autre chose Tony ?");
							break;
                        default:
							artyom.say("Alors bonne journée Tony.");
							artyom.say("Et n'oubliez pas de sauver le monde.");
							console.log('fin du scénario de recherche de parking');
							changeScenario();
                            break;
                    }
                }
            }
			
            artyom.addCommands(commande);
			

        }, 5000);
		
		setTimeout(function(){
            $('.bkgd-car').removeClass('wiggle');
        }, 7000);
		
	});


    /**
        SCENARIO ET COMMANDES PAR DEFAUTS;
    */
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

    function changeScenario(newScenario){
        if(newScenario){
            currentScenario = newScenario;
            $('.currentScenario').text('Scénario : ' + currentScenario);
        } else {
            $('.currentScenario').text('Aucun scénario actif');
        }
    }
});
