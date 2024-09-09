	//Function for determining star ratings
	function starRating(){
		var bribe = (Math.round(document.getElementById("gMBribe").value))
		var roll = (Math.floor(Math.random() * 100) + 1)
		var ran = roll + bribe
		var sR = 0
		if (ran > 0 && ran < 6){
			sR = 0
		}
		else if (ran > 5 && ran < 41){
			sR = 1
		}
		else if (ran > 40 && ran < 66) {
			sR = 2
		}
		else if (ran > 65 && ran < 86){
			sR = 3
		}
		else if (ran > 85 && ran < 96){
			sR = 4
		}
		else if (ran > 95 && ran < 100){
			sR = 5
		}
		else{
			sR = 6
		}
		return sR
	}
	//0 Star ability roll
	function roll3d6(){
		let array = []
		for (var i = 0; i < 3; i++){
			array.push(Math.floor(Math.random() * 6))
		}
		let sum = 0;
		for (var i = 0; i < array.length; i++){
			sum += array[i]
		}
		return sum
	}
	//1 Star ability roll
	function roll4d6b3(){
		let array = []
		for (var i = 0; i < 4; i++){
			array.push(Math.floor(Math.random() * 6) + 1)
		}
		array.sort();
		array.shift();
		let sum = 0;
		for (var i = 0; i < array.length; i++) {
			sum += array[i]
		}
		return sum
	}
	//2 Star ability roll
	function roll5d6b3(){
		let array = []
		for (var i = 0; i < 5; i++){
			array.push(Math.floor(Math.random() * 6) + 1)
		}
		array.sort();
		array.shift();
		array.shift();
		let sum = 0;
		for (var i = 0; i < array.length; i++) {
			sum += array[i]
		}
		return sum
	}
	//3 Star ability roll
	function roll6d6b3() {
		let array = []
		for (var i = 0; i < 6; i++) {
			array.push(Math.floor(Math.random() * 6) + 1)
		}
		array.sort();
		array.shift();
		array.shift();
		array.shift();
		let sum = 0;
		for (var i = 0; i < array.length; i++) {
			sum += array[i]
		}
		return sum
	}
	//4 Star ability roll
	function roll4d6b2(){
		let array = []
		for (var i = 0; i < 4; i++){
			array.push(Math.floor(Math.random() * 6) + 1)
		}
		array.sort();
		array.shift();
		array.shift();
		array.push(6);
		let sum = 0;
		for (var i = 0; i < array.length; i++) {
			sum += array[i]
		}
		return sum
	}
	//5 Star ability roll
	function roll5d6b2a1(){
		let array = []
		for (var i = 0; i < 5; i++){
			array.push(Math.floor(Math.random() * 6) + 1)
		}
		array.sort();
		array.shift();
		array.shift();
		array.shift();
		array.push(6);
		let sum = 0;
		for (var i = 0; i < array.length; i++) {
			sum += array[i]
		}
		return sum +2
	}
	//6 Star ability roll
	function roll5d6b1a2(){
		let array = []
		for (var i = 0; i < 5; i++){
			array.push(Math.floor(Math.random() * 6) + 1)
		}
		array.sort();
		array.shift();
		array.shift();
		array.shift();
		array.shift();
		array.push(6);
		array.push(6);
		let sum = 0;
		for (var i = 0; i < array.length; i++) {
			sum += array[i];
		}
		return sum + 2
	}
	function calculateModifier(number){
		return Math.floor((number - 10)/2)
	}
	function calculateSkillRanksAndBunuses(characterInfo, skill, subskill){
		let total = 0
		if (subskill){
			if (characterInfo.skillRanks[skill + "(" + subskill + ")"]){
				total += characterInfo.skillRanks[skill + "(" + subskill + ")"]
			}
			if (characterInfo.skillBonuses[skill + "(" + subskill + ")"]){
				total += characterInfo.skillBonuses[skill + "(" + subskill + ")"]
			}
		}
		else {
			if (characterInfo.skillRanks[skill]){
				total += characterInfo.skillRanks[skill]
			}
			if (characterInfo.skillBonuses[skill]){
				total += characterInfo.skillBonuses[skill]
			}
		}
		return total
	}
	function calculateSkillMod(characterInfo, skill, subskill){
		if (subskill){
			var total = calculateSkillRanksAndBunuses(characterInfo, skill, subskill)
		}
		else {
			var total = calculateSkillRanksAndBunuses(characterInfo, skill)
		}
		total += calculateModifier(characterInfo[skillData[skill].attribute.toLowerCase()])
		return total
	}
	function compareFunction(a, b){
		const nameA = a.toUpperCase()
		const nameB = b.toUpperCase()
		if (nameA < nameB){
			return -1;
		}
		else if (nameA > nameB){
			return 1;
		}
		else {
			return 0;
		}
	}
	function grantSkillBonus(characterInfo, skill, number) {
		if (characterInfo.skillBonuses[skill]){
			characterInfo.skillBonuses[skill] += number
		}
		else {
			characterInfo.skillBonuses[skill] = number
		}
	}
	function narrowAlignment(characterInfo, narrowedAlignments){
		for (var i = 0; i < characterInfo.elligbleAlignments.length; i++){
			if (!narrowedAlignments.includes(characterInfo.elligbleAlignments[i])){
				characterInfo.elligbleAlignments[i] = "Mark for Deletion"
			}
		}
		while (characterInfo.elligbleAlignments.includes("Mark for Deletion")){
			let index = characterInfo.elligbleAlignments.indexOf("Mark for Deletion")
			characterInfo.elligbleAlignments.splice(index, 1)
		}
	}
	function calculateMaximumSpellLevel(characterInfo){
		if (classData[characterInfo.class].fullCaster && characterInfo[classData[characterInfo.class].castingAttribute.toLowerCase()] >= 10){
			return characterInfo.spells[characterInfo.class].length
		}
		else {
			return -1
		}
	}
	function addFeat(characterInfo, feat, speciality){
		if (speciality === undefined){
			characterInfo.featsKnown.push(feat)
			featData[feat].uponLearning(characterInfo)
		}
		else {
			characterInfo.featsKnown.push(feat + " (" + speciality + ")")
			featData[feat].uponLearning(characterInfo, speciality)
		}
	}
	function canUseWeapon(characterInfo, weaponType) {
		if (characterInfo.weaponProficiencies[weaponType]){
			return true
		}
		else if (weaponData[weaponType].proficiencyType === "Simple" && characterInfo.weaponProficiencies.allSimple){
			return true
		}
		else if ((weaponData[weaponType].proficiencyType === "Martial" || characterInfo.features.includes("Weapon Familiarity (" + weaponType + ")")) && characterInfo.weaponProficiencies.allMartial){
			return true
		}
		else {
			return false
		}
	}
	function spellApprovedForCleric(characterInfo, spell){
		if (!spellData[spell].descriptor.includes("Chaotic") && !spellData[spell].descriptor.includes("Evil") && !spellData[spell].descriptor.includes("Good") && !spellData[spell].descriptor.includes("Lawful")){
			return true;
		}
		if (spellData[spell].descriptor.includes("Chaotic")){
			if (characterInfo.clericDomains.includes("Law")){
				return false
			}
			else if (characterInfo.godWorshiped !== "None" && godData[characterInfo.godWorshiped].alignment.includes("Lawful")){
				return false
			}
			else {
				return true
			}
		}
		if (spellData[spell].descriptor.includes("Evil")){
			if (characterInfo.clericDomains.includes("Good")){
				return false
			}
			else if (characterInfo.godWorshiped !== "None" && (godData[characterInfo.godWorshiped].alignment.includes("Good"))){
				return false
			}
			else {
				return true
			}
		}

		if (spellData[spell].descriptor.includes("Good")){
			if (characterInfo.clericDomains.includes("Evil")){
				return false
			}
			else if (characterInfo.godWorshiped !== "None" && godData[characterInfo.godWorshiped].alignment.includes("Evil")){
				return false
			}
			else {
				return true
			}
		}

		if (spellData[spell].descriptor.includes("Lawful")){
			if (characterInfo.clericDomains.includes("Chaos")){
				return false
			}
			else if (characterInfo.godWorshiped !== "None" && godData[characterInfo.godWorshiped].alignment.includes("Chaotic")){
				return false
			}
			else {
				return true
			}
		}
	}
	function showOnlyNPCClassesOptions(){
		if (document.getElementById("allowNPCClasses").checked){
			let span = document.getElementById("whereOnlyNPCClassOptionAppears")
			let checkbox = document.createElement("INPUT")
			checkbox.type = "checkbox"
			checkbox.id = "onlyNPCClasses"
			checkbox.name = "onlyNPCClasses"
			let label = document.createElement("LABEL")
			label.for = "onlyNPCClasses"
			label.appendChild(document.createTextNode("Include Only NPC Classes"))
			span.appendChild(document.createElement("BR"))
			span.appendChild(checkbox)
			span.appendChild(label)
		}
		else {
			document.getElementById("whereOnlyNPCClassOptionAppears").innerHTML = ""
		}
	}
