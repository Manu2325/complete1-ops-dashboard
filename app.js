const GCHAT_WEBHOOK_URL = "https://chat.googleapis.com/v1/spaces/AAQAW2t94sc/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=2GZ-2ChSl1mMEhgh7uxocoMdZt07sC-3qki7uPKIPNs";

// Credenciales de Firebase de tu proyecto operational-task-manager
const firebaseConfig = {
    apiKey: "AIzaSyBiofsFEyvFS2UEDzUE2ZffdLBqZm_xotA",
    authDomain: "operational-task-manager.firebaseapp.com",
    databaseURL: "https://operational-task-manager-default-rtdb.firebaseio.com",
    projectId: "operational-task-manager",
    storageBucket: "operational-task-manager.firebasestorage.app",
    messagingSenderId: "446600174564",
    appId: "1:446600174564:web:bce115d3bfae3e570745f1"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

try {
    firebase.database().INTERNAL.forceLongPolling();
} catch (e) {
    console.log("Long polling fallback configurado");
}

const db = firebase.database();

function getTodayString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

const defaultProfiles = {
    enmanuel: {
        id: "enmanuel",
        name: "Enmanuel Prada",
        role: "Operations Supervisor",
        subtitle: "Gestión de Operaciones EQ & FP | Cobertura Oct 19 - Nov 14, 2026",
        isManager: false,
        tasks: [
            { id: "e_d1", frequency: "once", date: getTodayString(), title: "Verificar Autonomía de Acceso Nicolas Lozano (7:00 AM)", sub: "Asegurar que pida el código VPN/DUO desde el teléfono de operaciones.", urgent: true },
            { id: "e_d2", frequency: "once", date: getTodayString(), title: "Actualización Bi-horaria de EQ & FP", sub: "Publicar resultados cada 2 horas hasta la salida.", urgent: true },
            { id: "e_d3", frequency: "once", date: getTodayString(), title: "Realizar 2-3 Auditorías QA por Agente (EQ & FP)", sub: "Auditar promesas de pago y calidad diariamente.", urgent: false },
            { id: "e_d4", frequency: "once", date: getTodayString(), title: "Revisar/Actualizar Hojas de Incentivos EQ & FP", sub: "Mantener los registros de incentivos al día.", urgent: false },
            { id: "e_d5", frequency: "once", date: getTodayString(), title: "Atender VTO / Overtime de inmediato", sub: "Tomar ofertas de capacidad en tiempo real.", urgent: true },
            { id: "e_d6", frequency: "once", date: getTodayString(), title: "Alineación de Agent Daily Status con David Urbino", sub: "Revisar métricas con David antes de enviar captura a WFM.", urgent: false },
            { id: "e_d7", frequency: "once", date: getTodayString(), title: "Atención a Google Chats (< 10 min de respuesta)", sub: "Asegurar respuesta inmediata a requerimientos en los chats.", urgent: true },
            { id: "e_w1", frequency: "once", date: "2026-10-12", title: "Envío de Horarios y Novedades a WFM (Cada Lunes)", sub: "Confirmar horarios e incluir novedades del mes.", urgent: true },
            { id: "e_w2", frequency: "once", date: "2026-10-14", title: "Sesión 1-a-1 de Coaching (15-60 min por agente)", sub: "Realizar y documentar sesión semanal por empleado.", urgent: false },
            { id: "e_w3", frequency: "once", date: "2026-10-16", title: "Actualización Sistema Thunder", sub: "Ingresar con credenciales de Adrian y actualizar métricas semanales.", urgent: false },
            { id: "e_w4", frequency: "once", date: "2026-10-16", title: "Gestión de Déficit Semanal de 13 Horas (EQ & FP)", sub: "Cubrir deficit pidiendo OT o ingresando a la línea.", urgent: true },
            { id: "e_m1", frequency: "once", date: "2026-10-28", title: "Desglose de Novedades y Facturación EQ & FP", sub: "Conciliar métricas y novedades del proyecto al cierre.", urgent: false },
            { id: "e_m2", frequency: "once", date: "2026-10-30", title: "Envío de Bonos e Incentivos a Finanzas (Fin de Octubre)", sub: "Enviar correo final de incentivos para pago en 2Q Noviembre.", urgent: true }
        ]
    },
    david: {
        id: "david",
        name: "David Urbino",
        role: "Operations Supervisor",
        subtitle: "Supervisor OCA Telcom & MED & DISH",
        isManager: false,
        tasks: [
            { id: "d_d1", frequency: "once", date: getTodayString(), title: "Compartir VPN con Pablo y Brandon (7:00 AM)", sub: "Estar atento a las 7:00 AM para dar el código VPN.", urgent: true },
            { id: "d_d2", frequency: "once", date: getTodayString(), title: "Completar Agent Daily Status con Enmanuel", sub: "Consultar a Enmanuel antes de enviar captura a WFM.", urgent: false },
            { id: "d_d3", frequency: "once", date: getTodayString(), title: "Actualización diaria OCA Telcom y MED", sub: "Actualizar resultados diarios y compartir con el equipo.", urgent: false },
            { id: "d_d4", frequency: "once", date: getTodayString(), title: "Auditar 10 llamadas de DISH Spanish al día", sub: "Cumplir con las 10 auditorías diarias obligatorias.", urgent: true },
            { id: "d_d5", frequency: "once", date: getTodayString(), title: "Auditar 2-3 llamadas por agente en MED (Livevox)", sub: "Calidad diaria para el equipo de MED.", urgent: false }
        ]
    },
    sergio: {
        id: "sergio",
        name: "Sergio Gonzalez",
        role: "Operations Supervisor",
        subtitle: "Responsable de Reportes y Estadísticas Operativas",
        isManager: false,
        tasks: [
            { id: "s_d1", frequency: "once", date: getTodayString(), title: "Generar Stats Diarias/Semanales/MTD (CRC_QC y CRCC_QC)", sub: "Completar al final del día.", urgent: true },
            { id: "s_d2", frequency: "once", date: getTodayString(), title: "Generar Stats Diarias/Semanales/MTD (Earthlink y Optimum)", sub: "Completar información diaria.", urgent: false }
        ]
    },
    adrian: {
        id: "adrian",
        name: "Adrian Lopez",
        role: "Operations Manager",
        subtitle: "Líder de Operaciones Complete Recovery",
        isManager: true,
        tasks: [
            { id: "a_d1", frequency: "once", date: getTodayString(), title: "Revisar cumplimiento de SLA de Google Chats (<10 min)", sub: "Supervisar respuesta rápida en los chats.", urgent: true }
        ]
    }
};

let profiles = defaultProfiles;
let currentUser = localStorage.getItem("eqfp_current_user") || "enmanuel";
let userTasks = [];
let completedTasks = {};

let ultimaHoraDisparada = null;
let ultimoCierreNocheDisparado = null;

function init() {
    document.getElementById("newTaskDate").value = getTodayString();
    document.getElementById("dailyViewDate").value = getTodayString();

    populateMonthlyDays();

    db.ref("profiles").on("value", snapshot => {
        const val = snapshot.val();
        if (val) {
            profiles = val;
        } else {
            db.ref("profiles").set(defaultProfiles);
        }
        renderUserSelector();
        populateAssignToDropdown();
        loadUserProfile();
    });

    startTimers();
}

function populateMonthlyDays() {
    const select = document.getElementById("newTaskDayOfMonth");
    if (!select) return;
    select.innerHTML = "";
    for (let i = 1; i <= 31; i++) {
        select.innerHTML += `<option value="${i}">Día ${i}</option>`;
    }
}

function populateAssignToDropdown() {
    const select = document.getElementById("assignToUser");
    if (!select) return;
    select.innerHTML = Object.keys(profiles).map(id => {
        const p = profiles[id];
        return `<option value="${p.id}">${p.name} (${p.role})</option>`;
    }).join('');
}

function toggleFrequencyInputs() {
    const freq = document.getElementById("taskFrequency").value;
    document.getElementById("containerOnce").style.display = freq === "once" ? "flex" : "none";
    document.getElementById("containerWeekly").style.display = freq === "weekly" ? "flex" : "none";
    document.getElementById("containerMonthly").style.display = freq === "monthly" ? "flex" : "none";
}

function saveProfilesInCloud() {
    db.ref("profiles").set(profiles);
}

function purgeOldTasks() {
    if (!userTasks || userTasks.length === 0) return;

    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const cutoffDateStr = sixtyDaysAgo.toISOString().split('T')[0];

    let hasChanges = false;

    const initialCount = userTasks.length;
    userTasks = userTasks.filter(task => {
        if (task.frequency === "once" && task.date && task.date < cutoffDateStr) {
            return false;
        }
        return true;
    });

    if (userTasks.length !== initialCount) {
        hasChanges = true;
    }

    Object.keys(completedTasks).forEach(instanceId => {
        const parts = instanceId.split('_');
        const taskDate = parts[parts.length - 1];

        if (taskDate && taskDate.length === 10 && taskDate < cutoffDateStr) {
            delete completedTasks[instanceId];
            hasChanges = true;
        }
    });

    if (hasChanges) {
        saveUserTasksInCloud();
        console.log("🧹 Limpieza de mantenimiento: Se liberaron registros con más de 60 días de antigüedad.");
    }
}

function listenUserTasksInCloud() {
    db.ref(`tasks/${currentUser}`).on("value", snapshot => {
        const data = snapshot.val();
        if (data) {
            userTasks = data.userTasks || [];
            completedTasks = data.completedTasks || {};
        } else {
            userTasks = profiles[currentUser] ? profiles[currentUser].tasks || [] : [];
            completedTasks = {};
            saveUserTasksInCloud();
        }
        
        purgeOldTasks();
        renderTasks();
    });
}

function saveUserTasksInCloud() {
    db.ref(`tasks/${currentUser}`).set({
        userTasks: userTasks,
        completedTasks: completedTasks
    });
}

function renderUserSelector() {
    const selector = document.getElementById("userSelector");
    selector.innerHTML = Object.keys(profiles).map(key => {
        const p = profiles[key];
        return `<option value="${p.id}">${p.name} (${p.role})</option>`;
    }).join('');
    selector.value = currentUser;
}

function changeUser() {
    currentUser = document.getElementById("userSelector").value;
    localStorage.setItem("eqfp_current_user", currentUser);
    
    db.ref(`tasks/${currentUser}`).off();
    listenUserTasksInCloud();
    loadUserProfile();
}

function loadUserProfile() {
    const profile = profiles[currentUser];
    if (!profile) return;

    document.getElementById("appTitle").innerText = `${profile.name} - Dashboard`;
    document.getElementById("userRoleSubtitle").innerText = `${profile.role} | ${profile.subtitle}`;
    
    const btnManage = document.getElementById("btnManageTeam");
    const containerAssignTo = document.getElementById("containerAssignTo");

    if (profile.isManager) {
        btnManage.style.display = "inline-block";
        if (containerAssignTo) containerAssignTo.style.display = "flex";
        const assignSelect = document.getElementById("assignToUser");
        if (assignSelect) assignSelect.value = currentUser;
    } else {
        btnManage.style.display = "none";
        if (containerAssignTo) containerAssignTo.style.display = "none";
    }

    listenUserTasksInCloud();
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return { week: weekNo, year: d.getUTCFullYear() };
}

function getNextBusinessDay(dateString) {
    let date = new Date(dateString + "T00:00:00");
    let dayOfWeek = date.getDay();

    if (dayOfWeek === 5) {
        date.setDate(date.getDate() + 3);
    } else if (dayOfWeek === 6) {
        date.setDate(date.getDate() + 2);
    } else {
        date.setDate(date.getDate() + 1);
    }

    return date.toISOString().split('T')[0];
}

function getPreviousBusinessDay(year, monthIndex, dayOfMonth) {
    let date = new Date(year, monthIndex, dayOfMonth);
    let dayOfWeek = date.getDay();

    if (dayOfWeek === 0) {
        date.setDate(date.getDate() - 2);
    } else if (dayOfWeek === 6) {
        date.setDate(date.getDate() - 1);
    }

    return date.toISOString().split('T')[0];
}

function sortTasksByPriority(tasksArray) {
    return [...tasksArray].sort((a, b) => {
        const aCompleted = !!completedTasks[a.id];
        const bCompleted = !!completedTasks[b.id];

        if (aCompleted !== bCompleted) {
            return aCompleted ? 1 : -1;
        }

        if (a.urgent !== b.urgent) {
            return a.urgent ? -1 : 1;
        }

        return 0;
    });
}

function isTaskActiveForDate(task, targetDateStr) {
    if (task.excludedDates && task.excludedDates.includes(targetDateStr)) {
        return false;
    }

    const freq = task.frequency || "once";

    if (freq === "once") {
        return task.date === targetDateStr;
    } 
    
    if (freq === "weekly") {
        const targetDate = new Date(targetDateStr + "T00:00:00");
        let targetDay = targetDate.getDay(); // 0: Dom, 1: Lun, 2: Mar...
        if (targetDay === 0) targetDay = 7;  // Dom -> 7
        
        const taskDay = parseInt(task.dayOfWeek);
        return targetDay === taskDay;
    } 
    
    if (freq === "monthly") {
        const targetDate = new Date(targetDateStr + "T00:00:00");
        const adjustedDateStr = getPreviousBusinessDay(targetDate.getFullYear(), targetDate.getMonth(), parseInt(task.dayOfMonth));
        return adjustedDateStr === targetDateStr;
    }

    return false;
}

function renderTasks() {
    renderDailyTab();
    renderWeeklyTab();
    renderMonthlyTab();
    renderSummaryTab();
}

function renderDailyTab() {
    const selectedDate = document.getElementById("dailyViewDate").value;
    const container = document.getElementById("dailyTaskList");

    const rawTasksForDay = userTasks.filter(t => isTaskActiveForDate(t, selectedDate));

    if (rawTasksForDay.length === 0) {
        container.innerHTML = `<div style="color:var(--text-secondary); font-size:0.875rem;">No hay tareas agendadas para el día ${selectedDate}. Agrega una arriba.</div>`;
        updateDailyProgress(0, 0);
        return;
    }

    const sortedTasks = [...rawTasksForDay].sort((a, b) => {
        const aInstanceId = `${a.id}_${selectedDate}`;
        const bInstanceId = `${b.id}_${selectedDate}`;

        const aCompleted = !!completedTasks[aInstanceId];
        const bCompleted = !!completedTasks[bInstanceId];

        if (aCompleted !== bCompleted) {
            return aCompleted ? 1 : -1;
        }

        if (a.urgent !== b.urgent) {
            return a.urgent ? -1 : 1;
        }

        return 0;
    });

    let doneCount = 0;
    container.innerHTML = sortedTasks.map(task => {
        const instanceId = `${task.id}_${selectedDate}`;
        const isChecked = completedTasks[instanceId] ? "checked" : "";
        const completedClass = completedTasks[instanceId] ? "completed" : "";
        const urgentClass = task.urgent ? "urgent" : "";
        if (completedTasks[instanceId]) doneCount++;

        let freqBadge = "";
        if (task.frequency === "weekly") freqBadge = '<span class="task-date-badge" style="background: rgba(245, 158, 11, 0.2); color: var(--accent-warning);">🔁 Semanal</span>';
        if (task.frequency === "monthly") freqBadge = '<span class="task-date-badge" style="background: rgba(34, 197, 94, 0.2); color: var(--accent-green);">🗓️ Mensual</span>';

        return `
            <div class="task-item ${completedClass} ${urgentClass}">
                <input type="checkbox" id="${instanceId}" ${isChecked} onchange="toggleTask('${instanceId}')">
                <div class="task-details">
                    <label for="${instanceId}" class="task-title">
                        ${task.title}
                        ${freqBadge}
                        ${task.urgent ? '<span class="task-urgent-badge">🚨 URGENTE</span>' : ''}
                    </label>
                    <div class="task-sub">${task.sub || ''}</div>
                </div>
                <button class="urgent-toggle-btn" onclick="toggleUrgent('${task.id}')" title="Marcar/Desmarcar Urgente">${task.urgent ? '🚨' : '⚪'}</button>
                <button class="delete-btn" onclick="deleteTask('${task.id}', '${selectedDate}')" title="Eliminar Tarea">🗑️</button>
            </div>
        `;
    }).join('');

    updateDailyProgress(doneCount, rawTasksForDay.length);
}

function renderWeeklyTab() {
    const container = document.getElementById("weeklyContainer");
    if (!userTasks || userTasks.length === 0) {
        container.innerHTML = `<div style="color:var(--text-secondary); font-size:0.875rem;">No hay tareas en el sistema.</div>`;
        return;
    }

    const today = new Date();
    const todayStr = getTodayString();
    const currentWeekInfo = getWeekNumber(today);
    const currentWeekNum = currentWeekInfo.week;
    const currentYear = currentWeekInfo.year;

    const allowedWeeks = [
        currentWeekNum,
        currentWeekNum + 1,
        currentWeekNum + 2
    ];

    const weeksGroup = {};

    // Obtener la fecha del lunes de la semana actual como punto de referencia base
    const currentDayOfWeek = today.getDay() || 7; // 1: Lun, ..., 6: Sáb, 7: Dom
    const mondayOfCurrentWeek = new Date(today);
    mondayOfCurrentWeek.setDate(today.getDate() - (currentDayOfWeek - 1));

    userTasks.forEach(task => {
        if (task.frequency === "weekly" && task.dayOfWeek) {
            const targetDay = parseInt(task.dayOfWeek); // 1: Lun, 2: Mar, 3: Mié, 4: Jue, 5: Vie

            allowedWeeks.forEach(weekNum => {
                const weekOffset = (weekNum - currentWeekNum) * 7;
                const tempDate = new Date(mondayOfCurrentWeek);
                
                // Sumar los días a partir del Lunes base (targetDay - 1)
                tempDate.setDate(mondayOfCurrentWeek.getDate() + weekOffset + (targetDay - 1));
                const taskDateStr = tempDate.toISOString().split('T')[0];

                if (taskDateStr >= todayStr && (!task.excludedDates || !task.excludedDates.includes(taskDateStr))) {
                    const key = `Semana ${weekNum} - Año ${currentYear}` + (weekNum === currentWeekNum ? " (Semana Actual)" : "");

                    if (!weeksGroup[key]) weeksGroup[key] = [];
                    if (!weeksGroup[key].some(t => t.id === task.id && t.displayDate === taskDateStr)) {
                        weeksGroup[key].push({ ...task, displayDate: taskDateStr });
                    }
                }
            });
        } else if (task.frequency === "monthly" && task.dayOfMonth) {
            const year = today.getFullYear();
            const month = today.getMonth();
            const taskDateStr = getPreviousBusinessDay(year, month, parseInt(task.dayOfMonth));

            if (taskDateStr >= todayStr && (!task.excludedDates || !task.excludedDates.includes(taskDateStr))) {
                const weekInfo = getWeekNumber(new Date(taskDateStr + "T00:00:00"));

                if (weekInfo.year === currentYear && allowedWeeks.includes(weekInfo.week)) {
                    const key = `Semana ${weekInfo.week} - Año ${weekInfo.year}` + (weekInfo.week === currentWeekNum ? " (Semana Actual)" : "");

                    if (!weeksGroup[key]) weeksGroup[key] = [];
                    weeksGroup[key].push({ ...task, displayDate: taskDateStr });
                }
            }
        } else {
            let taskDateStr = task.date || getTodayString();
            if (!task.excludedDates || !task.excludedDates.includes(taskDateStr)) {
                const taskDate = new Date(taskDateStr + "T00:00:00");
                const weekInfo = getWeekNumber(taskDate);

                if (weekInfo.year === currentYear && allowedWeeks.includes(weekInfo.week)) {
                    const key = `Semana ${weekInfo.week} - Año ${weekInfo.year}` + (weekInfo.week === currentWeekNum ? " (Semana Actual)" : "");

                    if (!weeksGroup[key]) weeksGroup[key] = [];
                    weeksGroup[key].push({ ...task, displayDate: taskDateStr });
                }
            }
        }
    });

    if (Object.keys(weeksGroup).length === 0) {
        container.innerHTML = `<div style="color:var(--text-secondary); font-size:0.875rem;">No hay tareas agendadas para la semana actual ni las próximas semanas.</div>`;
        return;
    }

    let html = "";
    for (const weekTitle in weeksGroup) {
        const rawTasks = weeksGroup[weekTitle];
        const sortedTasks = sortTasksByPriority(rawTasks);
        
        let completedCount = 0;
        sortedTasks.forEach(t => {
            if (completedTasks[`${t.id}_${t.displayDate}`]) completedCount++;
        });

        let taskItemsHtml = "";
        sortedTasks.forEach(task => {
            const instanceId = `${task.id}_${task.displayDate}`;
            const isChecked = completedTasks[instanceId] ? "checked" : "";
            const completedClass = completedTasks[instanceId] ? "completed" : "";
            const urgentClass = task.urgent ? "urgent" : "";

            let freqBadge = "";
            if (task.frequency === "weekly") freqBadge = '<span class="task-date-badge" style="background: rgba(245, 158, 11, 0.2); color: var(--accent-warning);">🔁 Semanal</span>';
            if (task.frequency === "monthly") freqBadge = '<span class="task-date-badge" style="background: rgba(34, 197, 94, 0.2); color: var(--accent-green);">🗓️ Mensual</span>';

            taskItemsHtml += `
                <div class="task-item ${completedClass} ${urgentClass}">
                    <input type="checkbox" id="w_${instanceId}" ${isChecked} onchange="toggleTask('${instanceId}')">
                    <div class="task-details">
                        <label for="w_${instanceId}" class="task-title">
                            ${task.title}
                            <span class="task-date-badge">${task.displayDate}</span>
                            ${freqBadge}
                            ${task.urgent ? '<span class="task-urgent-badge">🚨 URGENTE</span>' : ''}
                        </label>
                        <div class="task-sub">${task.sub || ''}</div>
                    </div>
                    <button class="urgent-toggle-btn" onclick="toggleUrgent('${task.id}')" title="Marcar/Desmarcar Urgente">${task.urgent ? '🚨' : '⚪'}</button>
                    <button class="delete-btn" onclick="deleteTask('${task.id}', '${task.displayDate}')" title="Eliminar Tarea">🗑️</button>
                </div>
            `;
        });

        html += `
            <div class="group-section">
                <div class="group-header">
                    <span>📅 ${weekTitle}</span>
                    <span>${completedCount} / ${rawTasks.length} Completadas</span>
                </div>
                <div class="task-list">${taskItemsHtml}</div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function renderMonthlyTab() {
    const container = document.getElementById("monthlyContainer");
    if (!userTasks || userTasks.length === 0) {
        container.innerHTML = `<div style="color:var(--text-secondary); font-size:0.875rem;">No hay tareas en el sistema.</div>`;
        return;
    }

    const monthsGroup = {};
    const now = new Date();
    const todayStr = getTodayString();

    userTasks.forEach(task => {
        if (task.frequency === "weekly" && task.dayOfWeek) {
            const targetDay = parseInt(task.dayOfWeek);

            for (let monthOffset = 0; monthOffset < 2; monthOffset++) {
                const year = now.getFullYear();
                const month = now.getMonth() + monthOffset;
                const daysInMonth = new Date(year, month + 1, 0).getDate();

                for (let d = 1; d <= daysInMonth; d++) {
                    const tempDate = new Date(year, month, d);
                    const dayOfWeekNum = tempDate.getDay() || 7;

                    if (dayOfWeekNum === targetDay) {
                        const dateStr = tempDate.toISOString().split('T')[0];
                        // FILTRO CLAVE: Ocurrencias del mes solo desde la fecha actual en adelante
                        if (dateStr >= todayStr && (!task.excludedDates || !task.excludedDates.includes(dateStr))) {
                            const monthName = tempDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
                            const key = monthName.charAt(0).toUpperCase() + monthName.slice(1);

                            if (!monthsGroup[key]) monthsGroup[key] = [];
                            monthsGroup[key].push({ ...task, displayDate: dateStr });
                        }
                    }
                }
            }
        } else if (task.frequency === "monthly" && task.dayOfMonth) {
            for (let monthOffset = 0; monthOffset < 2; monthOffset++) {
                const year = now.getFullYear();
                const month = now.getMonth() + monthOffset;
                const dateStr = getPreviousBusinessDay(year, month, parseInt(task.dayOfMonth));

                if (dateStr >= todayStr && (!task.excludedDates || !task.excludedDates.includes(dateStr))) {
                    const monthName = new Date(dateStr + "T00:00:00").toLocaleString('es-ES', { month: 'long', year: 'numeric' });
                    const key = monthName.charAt(0).toUpperCase() + monthName.slice(1);

                    if (!monthsGroup[key]) monthsGroup[key] = [];
                    if (!monthsGroup[key].some(t => t.id === task.id && t.displayDate === dateStr)) {
                        monthsGroup[key].push({ ...task, displayDate: dateStr });
                    }
                }
            }
        } else {
            let dateStr = task.date || getTodayString();
            if (!task.excludedDates || !task.excludedDates.includes(dateStr)) {
                const dateObj = new Date(dateStr + "T00:00:00");
                const monthName = dateObj.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
                const key = monthName.charAt(0).toUpperCase() + monthName.slice(1);

                if (!monthsGroup[key]) monthsGroup[key] = [];
                monthsGroup[key].push({ ...task, displayDate: dateStr });
            }
        }
    });

    if (Object.keys(monthsGroup).length === 0) {
        container.innerHTML = `<div style="color:var(--text-secondary); font-size:0.875rem;">No hay tareas agendadas para este mes.</div>`;
        return;
    }

    let html = "";
    for (const monthTitle in monthsGroup) {
        const rawTasks = monthsGroup[monthTitle];

        rawTasks.sort((a, b) => {
            const aInstanceId = `${a.id}_${a.displayDate}`;
            const bInstanceId = `${b.id}_${b.displayDate}`;

            const aCompleted = !!completedTasks[aInstanceId];
            const bCompleted = !!completedTasks[bInstanceId];

            if (aCompleted !== bCompleted) {
                return aCompleted ? 1 : -1;
            }

            if (a.urgent !== b.urgent) {
                return a.urgent ? -1 : 1;
            }

            return new Date(a.displayDate) - new Date(b.displayDate);
        });

        const pendingCount = rawTasks.filter(t => !completedTasks[`${t.id}_${t.displayDate}`]).length;

        let taskItemsHtml = "";
        rawTasks.forEach(task => {
            const instanceId = `${task.id}_${task.displayDate}`;
            const isChecked = completedTasks[instanceId] ? "checked" : "";
            const completedClass = completedTasks[instanceId] ? "completed" : "";
            const urgentClass = task.urgent ? "urgent" : "";

            let freqBadge = "";
            if (task.frequency === "weekly") freqBadge = '<span class="task-date-badge" style="background: rgba(245, 158, 11, 0.2); color: var(--accent-warning);">🔁 Semanal</span>';
            if (task.frequency === "monthly") freqBadge = '<span class="task-date-badge" style="background: rgba(34, 197, 94, 0.2); color: var(--accent-green);">🗓️ Mensual</span>';

            taskItemsHtml += `
                <div class="task-item ${completedClass} ${urgentClass}">
                    <input type="checkbox" id="m_${instanceId}" ${isChecked} onchange="toggleTask('${instanceId}')">
                    <div class="task-details">
                        <label for="m_${instanceId}" class="task-title">
                            ${task.title}
                            <span class="task-date-badge">${task.displayDate}</span>
                            ${freqBadge}
                            ${task.urgent ? '<span class="task-urgent-badge">🚨 URGENTE</span>' : ''}
                        </label>
                        <div class="task-sub">${task.sub || ''}</div>
                    </div>
                    <button class="urgent-toggle-btn" onclick="toggleUrgent('${task.id}')" title="Marcar/Desmarcar Urgente">${task.urgent ? '🚨' : '⚪'}</button>
                    <button class="delete-btn" onclick="deleteTask('${task.id}', '${task.displayDate}')" title="Eliminar Tarea">🗑️</button>
                </div>
            `;
        });

        html += `
            <div class="group-section">
                <div class="group-header">
                    <span>📌 ${monthTitle}</span>
                    <span>${pendingCount} Pendientes de ${rawTasks.length} totales</span>
                </div>
                <div class="task-list">${taskItemsHtml}</div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function renderSummaryTab() {
    const container = document.getElementById("summaryContainer");
    const filter = document.getElementById("summaryFilter") ? document.getElementById("summaryFilter").value : "all";

    if (!userTasks || userTasks.length === 0) {
        container.innerHTML = `<div style="color:var(--text-secondary); font-size:0.875rem;">No hay tareas registradas.</div>`;
        return;
    }

    const summaryTasks = [];
    const now = new Date();
    const todayStr = getTodayString();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    userTasks.forEach(task => {
        if (task.frequency === "weekly" && task.dayOfWeek) {
            const targetDay = parseInt(task.dayOfWeek);
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

            for (let d = 1; d <= daysInMonth; d++) {
                const tempDate = new Date(currentYear, currentMonth, d);
                const dayOfWeekNum = tempDate.getDay() || 7;

                if (dayOfWeekNum === targetDay) {
                    const dateStr = tempDate.toISOString().split('T')[0];
                    if (dateStr >= todayStr && (!task.excludedDates || !task.excludedDates.includes(dateStr))) {
                        summaryTasks.push({ ...task, displayDate: dateStr });
                    }
                }
            }
        } else if (task.frequency === "monthly" && task.dayOfMonth) {
            const dateStr = getPreviousBusinessDay(currentYear, currentMonth, parseInt(task.dayOfMonth));

            if (dateStr >= todayStr && (!task.excludedDates || !task.excludedDates.includes(dateStr))) {
                summaryTasks.push({ ...task, displayDate: dateStr });
            }
        } else {
            let dateStr = task.date || getTodayString();
            if (!task.excludedDates || !task.excludedDates.includes(dateStr)) {
                summaryTasks.push({ ...task, displayDate: dateStr });
            }
        }
    });

    let filteredTasks = [...summaryTasks];

    if (filter === "pending") {
        filteredTasks = filteredTasks.filter(t => !completedTasks[`${t.id}_${t.displayDate}`]);
    } else if (filter === "urgent") {
        filteredTasks = filteredTasks.filter(t => t.urgent);
    }

    if (filteredTasks.length === 0) {
        container.innerHTML = `<div style="color:var(--text-secondary); font-size:0.875rem;">No hay tareas que coincidan con el filtro.</div>`;
        return;
    }

    filteredTasks.sort((a, b) => {
        const aInstanceId = `${a.id}_${a.displayDate}`;
        const bInstanceId = `${b.id}_${b.displayDate}`;

        const aCompleted = !!completedTasks[aInstanceId];
        const bCompleted = !!completedTasks[bInstanceId];

        if (aCompleted !== bCompleted) {
            return aCompleted ? 1 : -1;
        }

        if (a.urgent !== b.urgent) {
            return a.urgent ? -1 : 1;
        }

        return new Date(a.displayDate) - new Date(b.displayDate);
    });

    let taskItemsHtml = "";
    filteredTasks.forEach(task => {
        const instanceId = `${task.id}_${task.displayDate}`;
        const isChecked = completedTasks[instanceId] ? "checked" : "";
        const completedClass = completedTasks[instanceId] ? "completed" : "";
        const urgentClass = task.urgent ? "urgent" : "";

        let freqBadge = "";
        if (task.frequency === "weekly") freqBadge = '<span class="task-date-badge" style="background: rgba(245, 158, 11, 0.2); color: var(--accent-warning);">🔁 Semanal</span>';
        if (task.frequency === "monthly") freqBadge = '<span class="task-date-badge" style="background: rgba(34, 197, 94, 0.2); color: var(--accent-green);">🗓️ Mensual</span>';

        taskItemsHtml += `
            <div class="task-item ${completedClass} ${urgentClass}">
                <input type="checkbox" id="s_${instanceId}" ${isChecked} onchange="toggleTask('${instanceId}')">
                <div class="task-details">
                    <label for="s_${instanceId}" class="task-title">
                        ${task.title}
                        <span class="task-date-badge">${task.displayDate}</span>
                        ${freqBadge}
                        ${task.urgent ? '<span class="task-urgent-badge">🚨 URGENTE</span>' : ''}
                    </label>
                    <div class="task-sub">${task.sub || ''}</div>
                </div>
                <button class="urgent-toggle-btn" onclick="toggleUrgent('${task.id}')" title="Marcar/Desmarcar Urgente">${task.urgent ? '🚨' : '⚪'}</button>
                <button class="delete-btn" onclick="deleteTask('${task.id}', '${task.displayDate}')" title="Eliminar Tarea">🗑️</button>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="group-section">
            <div class="group-header">
                <span>📊 Resumen Consolidado (${filteredTasks.length} Tareas)</span>
            </div>
            <div class="task-list">${taskItemsHtml}</div>
        </div>
    `;
}

function toggleTask(instanceId) {
    completedTasks[instanceId] = !completedTasks[instanceId];
    saveUserTasksInCloud();
}

function toggleUrgent(id) {
    const task = userTasks.find(t => t.id === id);
    if (task) {
        task.urgent = !task.urgent;
        saveUserTasksInCloud();
    }
}

function deleteTask(id, currentDate) {
    const task = userTasks.find(t => t.id === id);
    if (!task) return;

    const freq = task.frequency || "once";

    if (freq === "once") {
        if (confirm(`¿Eliminar la tarea "${task.title}"?`)) {
            userTasks = userTasks.filter(t => t.id !== id);
            delete completedTasks[`${id}_${currentDate}`];
            saveUserTasksInCloud();
        }
    } else {
        const opcion = prompt(
            `Esta es una tarea RECURRENTE (${freq.toUpperCase()}):\n\n` +
            `Escribe 1: Para eliminar SOLO para la fecha de hoy (${currentDate}).\n` +
            `Escribe 2: Para eliminar DEFINITIVAMENTE del calendario futuro.\n\n` +
            `Ingresa tu opción (1 o 2):`, "1"
        );

        if (opcion === "1") {
            if (!task.excludedDates) task.excludedDates = [];
            if (!task.excludedDates.includes(currentDate)) {
                task.excludedDates.push(currentDate);
            }
            delete completedTasks[`${id}_${currentDate}`];
            saveUserTasksInCloud();
            alert(`La tarea ha sido oculta para la fecha ${currentDate}. Volverá a aparecer en la siguiente recurrencia.`);
        } else if (opcion === "2") {
            userTasks = userTasks.filter(t => t.id !== id);
            delete completedTasks[`${id}_${currentDate}`];
            saveUserTasksInCloud();
            alert(`La tarea "${task.title}" fue eliminada definitivamente del calendario.`);
        }
    }
}

// CREACIÓN DE TAREA CON SOPORTE DE ASIGNACIÓN A CUALQUIER SUPERVISOR
function addNewCustomTask() {
    const title = document.getElementById("newTaskTitle").value.trim();
    const sub = document.getElementById("newTaskSub").value.trim();
    const isUrgent = document.getElementById("newTaskUrgent").checked;
    const freq = document.getElementById("taskFrequency").value;

    // Obtener el perfil destino (Si es Manager puede elegir, si no es Manager asigna a sí mismo)
    const currentProfile = profiles[currentUser];
    let targetUserId = currentUser;

    if (currentProfile && currentProfile.isManager) {
        const assignSelect = document.getElementById("assignToUser");
        if (assignSelect && assignSelect.value) {
            targetUserId = assignSelect.value;
        }
    }

    if (!title) {
        alert("Por favor ingresa un nombre para la tarea.");
        return;
    }

    let calculatedDate = "";
    let dayOfWeek = null;
    let dayOfMonth = null;

    if (freq === "once") {
        calculatedDate = document.getElementById("newTaskDate").value;
        if (!calculatedDate) {
            alert("Por favor selecciona una fecha válida.");
            return;
        }
    } else if (freq === "weekly") {
        dayOfWeek = document.getElementById("newTaskDayOfWeek").value;
    } else if (freq === "monthly") {
        dayOfMonth = document.getElementById("newTaskDayOfMonth").value;
    }

    const newId = "task_" + Date.now();
    const newTask = {
        id: newId, 
        date: calculatedDate, 
        dayOfWeek: dayOfWeek,
        dayOfMonth: dayOfMonth,
        title: title, 
        sub: sub, 
        urgent: isUrgent,
        frequency: freq,
        excludedDates: []
    };

    if (targetUserId === currentUser) {
        userTasks.push(newTask);
        saveUserTasksInCloud();
    } else {
        // Asignación directa en Firebase para el supervisor seleccionado
        db.ref(`tasks/${targetUserId}`).once("value", snapshot => {
            const data = snapshot.val() || {};
            let targetTasks = data.userTasks || [];
            let targetCompleted = data.completedTasks || {};

            targetTasks.push(newTask);

            db.ref(`tasks/${targetUserId}`).set({
                userTasks: targetTasks,
                completedTasks: targetCompleted
            });
        });
    }

    document.getElementById("newTaskTitle").value = "";
    document.getElementById("newTaskSub").value = "";
    document.getElementById("newTaskUrgent").checked = false;
    
    const targetName = profiles[targetUserId] ? profiles[targetUserId].name : "Usuario";
    alert(`Tarea creada con éxito para ${targetName}.`);
}

function updateDailyProgress(done, total) {
    if (total === 0) {
        document.getElementById("dailyProgressBar").style.width = `0%`;
        document.getElementById("dailyProgressText").innerText = `0%`;
        return;
    }
    const pct = Math.round((done / total) * 100);
    document.getElementById("dailyProgressBar").style.width = `${pct}%`;
    document.getElementById("dailyProgressText").innerText = `${pct}% (${done}/${total})`;
}

function resetAllDailyTasks() {
    const selectedDate = document.getElementById("dailyViewDate").value;
    const tasksForDay = userTasks.filter(t => isTaskActiveForDate(t, selectedDate));
    tasksForDay.forEach(t => completedTasks[`${t.id}_${selectedDate}`] = false);
    saveUserTasksInCloud();
}

function switchTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

    event.target.classList.add("active");
    document.getElementById(tabId).classList.add("active");
}

function openTeamModal() {
    renderSupervisorManageList();
    populateSuccessorDropdown();
    document.getElementById("teamModal").classList.add("active");
}

function closeTeamModal() {
    document.getElementById("teamModal").classList.remove("active");
}

function populateSuccessorDropdown() {
    const select = document.getElementById("transferSuccessorSelect");
    select.innerHTML = Object.keys(profiles)
        .filter(id => id !== currentUser)
        .map(id => `<option value="${id}">${profiles[id].name} (${profiles[id].role})</option>`)
        .join('');
}

function transferManagerRole() {
    const successorId = document.getElementById("transferSuccessorSelect").value;
    if (!successorId) {
        alert("Selecciona a un supervisor de la lista para realizar el traspaso.");
        return;
    }

    const currentManager = profiles[currentUser];
    const successor = profiles[successorId];

    if (confirm(`¿Confirmas el TRASPASO DE MANDO? \n\n${successor.name} asumirá el cargo de Operations Manager y ${currentManager.name} pasará a ser Operations Supervisor.`)) {
        currentManager.isManager = false;
        currentManager.role = "Operations Supervisor";

        successor.isManager = true;
        successor.role = "Operations Manager";

        saveProfilesInCloud();

        currentUser = successorId;
        localStorage.setItem("eqfp_current_user", currentUser);

        closeTeamModal();
        alert(`🎉 ¡Traspaso completado! ${successor.name} es el nuevo Operations Manager.`);
    }
}

function renderSupervisorManageList() {
    const container = document.getElementById("supervisorListContainer");
    container.innerHTML = Object.keys(profiles).map(key => {
        const p = profiles[key];
        const deleteButton = p.isManager ? '<small style="color:var(--accent-warning); font-weight:bold;">👑 Operations Manager</small>' : `<button class="delete-btn" onclick="removeSupervisor('${p.id}')" title="Eliminar Supervisor">🗑️ Eliminar</button>`;
        
        return `
            <div class="supervisor-manage-item">
                <div>
                    <strong>${p.name}</strong> (${p.role})
                    <div style="font-size:0.8rem; color:var(--text-secondary);">${p.subtitle}</div>
                </div>
                <div>${deleteButton}</div>
            </div>
        `;
    }).join('');
}

function addNewSupervisor() {
    const name = document.getElementById("newSupName").value.trim();
    const sub = document.getElementById("newSupSub").value.trim();

    if (!name) {
        alert("Por favor ingresa el nombre del nuevo supervisor o agente.");
        return;
    }

    const newId = "sup_" + Date.now();
    profiles[newId] = {
        id: newId,
        name: name,
        role: "Operations Supervisor",
        subtitle: sub || "Operations Supervisor",
        isManager: false,
        tasks: [
            { id: newId + "_1", frequency: "once", date: getTodayString(), title: "Revisar correo de alineación y operativas", sub: "Tarea inicial asignada.", urgent: false }
        ]
    };

    saveProfilesInCloud();
    populateAssignToDropdown();
    document.getElementById("newSupName").value = "";
    document.getElementById("newSupSub").value = "";
    alert(`Miembro ${name} agregado con éxito.`);
}

function removeSupervisor(id) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${profiles[id].name} del dashboard?`)) {
        delete profiles[id];
        saveProfilesInCloud();
        populateAssignToDropdown();
        
        if (currentUser === id) currentUser = "adrian";
        localStorage.setItem("eqfp_current_user", currentUser);
    }
}

async function enviarAlertaGoogleChat(textoMensaje) {
    try {
        await fetch(GCHAT_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ text: textoMensaje }),
            mode: "no-cors"
        });
    } catch (err) {
        console.error("Error enviando alerta a Google Chat:", err);
    }
}

function enviarAlertasUrgentesDelDia() {
    const today = getTodayString();
    const urgentToday = userTasks.filter(t => isTaskActiveForDate(t, today) && t.urgent && !completedTasks[`${t.id}_${today}`]);
    const profile = profiles[currentUser];

    if (urgentToday.length === 0) {
        alert("No hay tareas urgentes pendientes para el día de hoy.");
        return;
    }

    let listText = urgentToday.map(t => `• *${t.title}* (${t.sub || 'Sin detalle'})`).join('\n');
    let msg = `🚨 *TAREAS URGENTES DEL DÍA* (${today}) 🚨\n\nSupervisor a cargo: *${profile.name}*\n\nPendientes prioritarios:\n${listText}\n\nPor favor atender a la brevedad.`;

    enviarAlertaGoogleChat(msg);
    alert("Alertas de tareas urgentes enviadas a Google Chat.");
}

function testChatWebhook() {
    const profile = profiles[currentUser];
    enviarAlertaGoogleChat(`🤖 *Prueba del Sistema*: Alerta enviada por ${profile.name} (${profile.role}).`);
    alert("Mensaje de prueba enviado.");
}

function publicarYReiniciarBihorario() {
    const profile = profiles[currentUser];
    const msg = `📊 *RECORDATORIO DE RESULTADOS*: ${profile.name} ha emitido un recordatorio para publicar resultados bi-horarios.`;
    enviarAlertaGoogleChat(msg);
    alert("Recordatorio bi-horario enviado a Google Chat.");
}

function enviarAlertaLunesWFM() {
    const msg = "📅 *RECORDATORIO SEMANAL WFM*: @David Urbino @Enmanuel Prada Recuerden enviar el correo de horarios y novedades del mes a WFM.";
    enviarAlertaGoogleChat(msg);
    alert("Recordatorio WFM enviado a Google Chat.");
}

function startTimers() {
    updateRealTimeTimers();
    setInterval(updateRealTimeTimers, 1000);
}

function updateRealTimeTimers() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour >= 9 && currentHour % 2 === 1 && currentMinute === 0) {
        if (ultimaHoraDisparada !== currentHour) {
            ultimaHoraDisparada = currentHour;
            publicarAlertaBihorariaAutomatica();
        }
    }

    if (currentHour === 22 && currentMinute === 30) {
        const todayStr = getTodayString();
        if (ultimoCierreNocheDisparado !== todayStr) {
            ultimoCierreNocheDisparado = todayStr;
            ejecutarCierreYReagendamiento(todayStr, true);
        }
    }

    const nextBiHourlyTarget = getNextBiHourlyTarget(now);
    const biHourlyDiffMs = nextBiHourlyTarget - now;
    document.getElementById("bihourlyTimer").innerText = formatTimeMs(biHourlyDiffMs);

    let chatTargetTime = localStorage.getItem("eqfp_chat_target_time");
    if (!chatTargetTime) {
        resetChatTimer();
        chatTargetTime = localStorage.getItem("eqfp_chat_target_time");
    }

    const chatDiffMs = parseInt(chatTargetTime) - now.getTime();
    if (chatDiffMs <= 0) {
        document.getElementById("chatTimer").innerText = "00:00 (SLA VENCIDO)";
        document.getElementById("chatTimer").style.color = "var(--accent-danger)";
    } else {
        document.getElementById("chatTimer").innerText = formatTimeMs(chatDiffMs, false);
        document.getElementById("chatTimer").style.color = "var(--accent-blue)";
    }
}

function getNextBiHourlyTarget(now) {
    const target = new Date(now);
    const currentHour = now.getHours();

    if (currentHour < 9) {
        target.setHours(9, 0, 0, 0);
        return target;
    }

    let nextHour;
    if (currentHour % 2 === 1) {
        nextHour = currentHour + 2;
    } else {
        nextHour = currentHour + 1;
    }

    target.setHours(nextHour, 0, 0, 0);
    return target;
}

function publicarAlertaBihorariaAutomatica() {
    const profile = profiles[currentUser];
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msg = `🚨 *ALERTA BI-HORARIA AUTOMÁTICA* (${horaActual}) 🚨\n\n*${profile.name}*, ha llegado la hora de publicar los resultados de EQ & FP en los chats correspondientes.`;
    
    enviarAlertaGoogleChat(msg);
}

function resetChatTimer() {
    const targetTime = new Date().getTime() + (10 * 60 * 1000);
    localStorage.setItem("eqfp_chat_target_time", targetTime);
    updateRealTimeTimers();
}

function formatTimeMs(ms, includeHours = true) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = num => num.toString().padStart(2, '0');

    if (includeHours) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
        return `${pad(minutes)}:${pad(seconds)}`;
    }
}

function ejecutarCierreYReagendamiento(fechaObjetivo, esAutomatico = false) {
    const nextBusinessDay = getNextBusinessDay(fechaObjetivo);
    let resumenAlertas = [];

    const usuariosAProcesar = esAutomatico ? Object.keys(profiles) : [currentUser];

    usuariosAProcesar.forEach(userId => {
        const userProfile = profiles[userId];
        
        db.ref(`tasks/${userId}`).once("value", snapshot => {
            const data = snapshot.val() || {};
            let userTasksList = data.userTasks || (userProfile ? userProfile.tasks || [] : []);
            let userCompletedDict = data.completedTasks || {};

            const tasksForDay = userTasksList.filter(t => isTaskActiveForDate(t, fechaObjetivo));
            const incompleteTasks = tasksForDay.filter(t => !userCompletedDict[`${t.id}_${fechaObjetivo}`]);

            if (incompleteTasks.length > 0) {
                incompleteTasks.forEach(task => {
                    const freq = task.frequency || "once";
                    if (freq === "once") {
                        task.date = nextBusinessDay;
                    } else {
                        const carryOverId = `carry_${task.id}_${nextBusinessDay}`;
                        if (!userTasksList.some(t => t.id === carryOverId)) {
                            userTasksList.push({
                                id: carryOverId,
                                frequency: "once",
                                date: nextBusinessDay,
                                title: `📌 [REAGENDADA] ${task.title}`,
                                sub: task.sub || "Tarea pendiente del día anterior",
                                urgent: task.urgent
                            });
                        }
                    }
                });

                db.ref(`tasks/${userId}`).set({
                    userTasks: userTasksList,
                    completedTasks: userCompletedDict
                });

                let listText = incompleteTasks.map(t => `• *${t.title}*`).join('\n');
                resumenAlertas.push(`👤 *${userProfile.name}* (${userProfile.role}):\n${listText}`);
            }
        });
    });

    setTimeout(() => {
        if (resumenAlertas.length > 0) {
            let tituloAlerta = esAutomatico ? "🚨 *CIERRE NOCTURNO AUTOMÁTICO (10:30 PM)* 🚨" : "⚠️ *REAGENDAMIENTO AUTOMÁTICO DE TAREAS* ⚠️";
            
            const msg = `${tituloAlerta}\n\nFecha Original: *${fechaObjetivo}*\nReagendadas para: *${nextBusinessDay}* (Siguiente Día Hábil)\n\n*Resumen de Tareas Incompletas Reagendadas:*\n\n${resumenAlertas.join('\n\n')}\n\nLas tareas fueron reprogramadas en la agenda de cada usuario.`;

            enviarAlertaGoogleChat(msg);
        } else if (!esAutomatico) {
            alert("¡Felicitaciones! Todas las tareas de hoy están completadas. No hay nada pendiente por reagendar.");
        }
    }, 1500);
}

function cerrarDiaYReagendarIncompletas() {
    const selectedDate = document.getElementById("dailyViewDate").value;
    ejecutarCierreYReagendamiento(selectedDate, false);
}

window.onload = init;