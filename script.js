fetch("matches.json")
  .then(res => res.json())
  .then(matches => {
    
    const groupA = matches.filter(m => m.group === "A");
    const groupB = matches.filter(m => m.group === "B");
 
    displayFixtures(groupA, "groupA-fixtures");
    displayFixtures(groupB, "groupB-fixtures");
 
    generateTable(groupA, "groupA-table");
    generateTable(groupB, "groupB-table");
 
  });
 
function displayFixtures(matches, containerId) {
 
    const container = document.getElementById(containerId);
    container.innerHTML = "";
 
    matches.forEach(match => {
 
        container.innerHTML += `
        <div class="match-card">
 
            <div class="date">${match.date}</div>
 
            <div class="teams">
                <div class="team">${match.home}</div>
 
                <div class="score">
                   ${match.homeScore === null ? "? - ?" : 
                   `${match.homeScore} - ${match.awayScore}`
                   }
                    
                </div>
 
                <div class="team">${match.away}</div>
            </div>
 
        </div>
        `;
 
    });
 
}
 
function generateTable(matches, tableId){
 
    let teams = {};
 
    // Create team objects
    matches.forEach(match=>{
 
        if(!teams[match.home]){
 
            teams[match.home]={
                team:match.home,
                P:0,
                W:0,
                D:0,
                L:0,
                GF:0,
                GA:0,
                GD:0,
                Pts:0
            };
 
        }
 
        if(!teams[match.away]){
 
            teams[match.away]={
                team:match.away,
                P:0,
                W:0,
                D:0,
                L:0,
                GF:0,
                GA:0,
                GD:0,
                Pts:0
            };
 
        }
 
    });
 
    // Calculate stats
    matches.forEach(match=>{

        if(match.homeScore === null) return;
 
        let home=teams[match.home];
        let away=teams[match.away];
 
        home.P++;
        away.P++;
 
        home.GF+=match.homeScore;
        home.GA+=match.awayScore;
 
        away.GF+=match.awayScore;
        away.GA+=match.homeScore;
 
        if(match.homeScore>match.awayScore){
 
            home.W++;
            home.Pts+=3;
 
            away.L++;
 
        }
        else if(match.homeScore<match.awayScore){
 
            away.W++;
            away.Pts+=3;
 
            home.L++;
 
        }
        else{
 
            home.D++;
            away.D++;
 
            home.Pts++;
            away.Pts++;
 
        }
 
    });
 
    Object.values(teams).forEach(team=>{
 
        team.GD=team.GF-team.GA;
 
    });
 
    // Sort
    let table=Object.values(teams);
 
    table.sort((a,b)=>{
 
        if(b.Pts!=a.Pts)
            return b.Pts-a.Pts;
 
        if(b.GD!=a.GD)
            return b.GD-a.GD;
 
        return b.GF-a.GF;
 
    });
 
    // Display
    const tbody=document.getElementById(tableId);
 
    tbody.innerHTML="";
 
    table.forEach((team,index)=>{
 
        tbody.innerHTML+=`
 
        <tr>
 
        <td>${index+1}</td>
 
        <td>${team.team}</td>
 
        <td>${team.P}</td>

        <td>${team.GF}</td>

        <td>${team.GA}</td>
 
        <td>${team.GD}</td>
 
        <td>${team.Pts}</td>
 
        </tr>
 
        `;
 
    });
 
}
