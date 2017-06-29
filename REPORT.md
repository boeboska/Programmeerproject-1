# Report De Noorse Droom
#### Milou Bisseling

## Korte beschrijving visualisatie
In de visualisatie worden de resultaten van mijn onderzoek naar de Nederlandse aardgasbaten en de Noorse 
oliebaten weergegeven. In het onderzoek wordt het beleid van Noorwegen en Nederland met elkaar vergeleken. 
Noorwegen heeft de oliebaten in een fonds gestopt en daar rendement over verdient, daarnaast hebben zij ook jaarlijks een deel
uit het fonds gehaald voor de begroting. Nederland heeft de aardgasbaten vooral gespendeerd aan de algemene middelen. 
Met uitzondering van het Fonds Economische Structuurverwerving (1995-2010) waar een deel van het geld heen is gegaan,
is de rest van de baten in op gegaan in de Nederlandse begroting. Met het einde van de aardgasreserves in zich rest de vraag:
Is dit een goed beleid geweest, en moeten we dit beleid doorzetten? Aan de hand van mijn visualisatie probeer ik duidelijk
te maken dat het nog niet te laat is, wel moet een kanttekening gemaakt worden dat de schattingen van het rendement en
de gasprijzen zeer onzeker zijn. Verder is het ook vooral leuk om te zien wat de marktwaarde van een Nederlands fonds zou
zijn, wanneer we het Noorse voorbeeld gevolgd hadden vanaf het begin. De kijker kan zelf bepalen welk rendement het wil
kiezen en welke olieprijzen ze in de toekomst wil zien.

## Technisch design
De visualisatie is als volgt opgebouwd, ik begin met een grafiek van de eindige aardgasreserves. Je kunt met je muis
over de lijn gaan, je kunt zien dat de aardgasreserves op zullen zijn in 2034. Hierbij maak ik meteen de noodzaak van
het verhaal duidelijk, er moet nagedacht worden over wat we gaan doen met het gat in de begroting wanneer we geen
aardgasbaten meer hebben. Daarna vertel ik verder over de situatie wanneer we volgens Noors beleid een vermogensfonds hadden
opgericht vanaf de ontdekking van het Nederlands aardgas. Daarbij zie je de opbouw van deze beide fondsen die bestaat
uit de totale baten en het totale rendement. Daar doorheen loopt een paarse lijn met de marktwaarde van het betreffende fonds.
Wanneer je met je muis over de lijn beweegt zie je de marktwaarde van het fonds voor dat jaar maar boven de grafiek zie 
je ook de (denkbeeldige) teller lopen net zoals [hier](https://www.nbim.no/). Daarnaast kun je bij de Nederlandse grafiek
kiezen welk rendement je wilt zien. Daarbij zijn er twee keuzes, het Noorse gemiddelde rendement of het gemiddelde rendement
van de grootste Nederlandse pensioenfondsen. Deze keuze qua rendement kan de gebruiker maken door het dropdownmenu 
te gebruiken. Om het verhaal af te sluiten laat ik in de laatste grafiek twee situaties zien
voor wanneer we in 2018 alsnog een vermogensfonds op zouden richten. Daarbij kan de kijker kiezen tussen twee mogelijke
olieprijzen voor de toekomst via een dropdownmenu. 

Qua code is het als volgt opgebouwd, de eerste grafiek is geschreven in een javascript file. De 2 grafieken erna (NL vs. NW)
zijn opgebouwd uit een stacked barchart een line graph over elkaar heen geplakt. Daarbij komen beide linegraphs uit een file,
en beide stacked barcharts uit een file. De laatste grafiek komt wederom uit een javascript file.

## Proces
De keuze om een eigen onderzoek te gebruiken terwijl het onderzoek in dezelfde periode loopt als dit vak, was misschien
niet de slimste keuze. Vervelend hieraan was dat ik zeker 7 volle dagen bezig ben geweest met de data en ook tijdens het 
maken van de grafieken soms te maken had met veranderende data. Dit heeft me eigenlijk te veel tijd gekost, waardoor
ik niet alles eruit heb kunnen halen wat ik eruit had willen halen. Ik had graag nog langer de tijd gehad om nog 
meer opties toe te voegen voor de gebruiker, dat had me leuk geleken. Al met al ben ik niet ontevreden met het resultaat,
en is mijn docent op de VU ook erg enthousiast. Wel blijft het zonder hoeveel tijd ik kwijt ben geweest met de data.
Naast de data waren ook de tooltips (gelijk bewegend) erg arbeidsintensief, ik had het zo in mijn hoofd en wilde het dan
ook per se zo maar dit heeft met ook weer in totaal 5 dagen gekost. Ik heb nu wel het idee dat ik d3 veel beter beheers,
ik snap eindelijk hoe het in elkaar zit. Bij data processing was het vooral kopieren, plakken en een beetje aanpassen,
nu heb ik ook gebruik gemaakt van bestaande code maar je kwam er niet onderuit om grote aanpassingen te maken om het te
maken zoals jij het wil.
